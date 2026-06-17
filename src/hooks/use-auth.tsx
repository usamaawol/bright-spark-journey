import * as React from "react";
import { onAuthStateChanged, User, updateEmail, updateProfile as updateFirebaseProfile, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth, db, storage } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export interface UserProfile {
  uid: string;
  email: string | null;
  fullName: string;
  phoneNumber: string;
  gender?: string;
  age?: string;
  passportNumber?: string;
  photoURL?: string;
  role: "student" | "admin";
  currentLevel: string;
  attendance: number;
  progress: number;
  grammarProgress: number;
  vocabularyProgress: number;
  speakingProgress: number;
  dailyExpressionsProgress: number;
  joinedAt: any;
}

export function useAuth() {
  const [user, setUser] = React.useState<User | null>(null);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    console.log("useAuth: Initializing onAuthStateChanged");
    
    // Set a safety timeout to prevent infinite loading state
    const loadingTimeout = setTimeout(() => {
      if (loading) {
        console.warn("useAuth: Loading timeout reached, forcing loading to false");
        setLoading(false);
      }
    }, 10000); // 10 seconds safety timeout

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("useAuth: Auth state changed, user:", firebaseUser?.uid);
      clearTimeout(loadingTimeout);
      setUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          console.log("useAuth: Fetching profile for:", firebaseUser.uid);
          const docRef = doc(db, "users", firebaseUser.uid);
          
          // Add timeout to getDoc as well
          const docPromise = getDoc(docRef);
          const docTimeoutPromise = new Promise<null>((_, reject) => 
            setTimeout(() => reject(new Error("Profile fetch timed out")), 8000)
          );
          
          const docSnap = await Promise.race([docPromise, docTimeoutPromise]) as any;
          
          if (docSnap && docSnap.exists()) {
            console.log("useAuth: Profile found");
            setProfile(docSnap.data() as UserProfile);
          } else {
            console.warn("useAuth: No user profile found in Firestore");
          }
        } catch (error) {
          console.error("useAuth: Error fetching user profile:", error);
        }
      } else {
        setProfile(null);
      }
      
      console.log("useAuth: Setting loading to false");
      setLoading(false);
    });

    return () => {
      unsubscribe();
      clearTimeout(loadingTimeout);
    };
  }, []);

  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!user || !profile) return;

    try {
      // Update Firestore first
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, data);

      // Update local state
      setProfile(prev => prev ? { ...prev, ...data } : null);

      // Update Firebase Auth display name if changed
      if (data.fullName && user.displayName !== data.fullName) {
        await updateFirebaseProfile(user, { displayName: data.fullName });
      }

      // Update Firebase Auth email if changed
      if (data.email && user.email !== data.email) {
        // Note: For email update, user should re-authenticate in real app
        await updateEmail(user, data.email);
      }

      // Update Firebase Auth photoURL if changed
      if (data.photoURL && user.photoURL !== data.photoURL) {
        await updateFirebaseProfile(user, { photoURL: data.photoURL });
      }

      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const uploadProfilePicture = async (file: File): Promise<string> => {
    if (!user) throw new Error("User not authenticated");

    const storageRef = ref(storage, `profile-pictures/${user.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optional: Track upload progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        async () => {
          // Upload completed successfully, get the download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateUserProfile({ photoURL: downloadURL });
          resolve(downloadURL);
        }
      );
    });
  };

  return { user, profile, loading, updateUserProfile, uploadProfilePicture };
}
