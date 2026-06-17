import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { motion } from "framer-motion";
import { Chrome } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/register")({
  component: RegisterComponent,
});

function RegisterComponent() {
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    console.log("Registration started for:", email);
    
    try {
      console.log("Calling createUserWithEmailAndPassword...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User created successfully:", user.uid);

      // Create user profile in Firestore
      console.log("Creating user profile in Firestore...");
      
      // Add a safety timeout for Firestore operation
      const profilePromise = setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName,
        email,
        phoneNumber: phone,
        gender,
        role: "student",
        currentLevel: "Beginner",
        attendance: 0,
        progress: 0,
        grammarProgress: 0,
        vocabularyProgress: 0,
        speakingProgress: 0,
        dailyExpressionsProgress: 0,
        joinedAt: serverTimestamp(),
      });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("Firestore operation timed out. Please check your connection or Firebase settings.")), 15000)
      );

      await Promise.race([profilePromise, timeoutPromise]);
      console.log("Firestore profile created successfully");

      toast.success("Account created successfully!");
      console.log("Navigating to dashboard...");
      navigate({ to: "/dashboard" });
    } catch (error: any) {
      console.error("Registration error:", error);
      let errorMessage = error.message || "Failed to register";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered. Please try logging in instead.";
      }
      toast.error(errorMessage);
    } finally {
      console.log("Registration process finished, setting loading to false");
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          fullName: user.displayName || "New Student",
          email: user.email,
          phoneNumber: user.phoneNumber || "",
          role: "student",
          currentLevel: "Beginner",
          attendance: 0,
          progress: 0,
          grammarProgress: 0,
          vocabularyProgress: 0,
          speakingProgress: 0,
          dailyExpressionsProgress: 0,
          joinedAt: serverTimestamp(),
        });
      }

      toast.success("Signed up with Google!");
      navigate({ to: "/dashboard" });
    } catch (error: any) {
      console.error("Google signup error:", error);
      toast.error(error.message || "Failed to sign up with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <Card className="border-none shadow-2xl bg-card transition-colors duration-300">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-[family-name:var(--font-display)] font-extrabold text-center text-foreground">
                Join the Academy
              </CardTitle>
              <CardDescription className="text-center text-muted-foreground font-medium">
                Start your journey to English fluency today
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                type="button"
                className="w-full py-6 border-input flex items-center gap-3 font-bold hover:bg-accent hover:text-accent-foreground"
                onClick={handleGoogleSignup}
                disabled={loading}
              >
                <Chrome className="size-5" />
                SIGN UP WITH GOOGLE
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground font-bold">Or with email</span>
                </div>
              </div>

              <form onSubmit={handleRegister} className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-foreground font-bold">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="bg-background border-input text-foreground focus:ring-2 focus:ring-[color:var(--color-spark)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-bold">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background border-input text-foreground focus:ring-2 focus:ring-[color:var(--color-spark)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground font-bold">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+251 911 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="bg-background border-input text-foreground focus:ring-2 focus:ring-[color:var(--color-spark)]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-foreground font-bold">Gender</Label>
                  <Select onValueChange={setGender} defaultValue={gender}>
                    <SelectTrigger className="bg-background border-input text-foreground">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground font-bold">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-background border-input text-foreground focus:ring-2 focus:ring-[color:var(--color-spark)]"
                  />
                </div>
                <Button type="submit" className="w-full py-6 bg-[color:var(--color-navy)] hover:bg-[color:var(--color-navy)]/90 dark:bg-primary dark:text-primary-foreground font-bold uppercase tracking-widest transition-all" disabled={loading}>
                  {loading ? "Creating account..." : "Register Now"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 border-t border-border mt-4 pt-6">
              <div className="text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-[color:var(--color-spark)] font-bold hover:underline">
                  Login here
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
