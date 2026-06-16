import * as React from "react";
import { onAuthStateChanged, User, updateEmail, updateProfile as updateFirebaseProfile, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export interface UserProfile {
  uid: string;
  email: string | null;
  fullName: string;
  phoneNumber: string;
  gender?: string;
  age?: string;
  passportNumber?: string;
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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        try {
          const docRef = doc(db, "users", firebaseUser.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            console.warn("No user profile found in Firestore");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
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

      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  return { user, profile, loading, updateUserProfile };
}
