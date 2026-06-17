import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { motion } from "framer-motion";
import { Chrome } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    
    setLoading(true);
    console.log("Login started for:", email);
    
    try {
      console.log("Calling signInWithEmailAndPassword...");
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      toast.success("Welcome back!");
      console.log("Navigating to dashboard...");
      navigate({ to: "/dashboard" });
    } catch (error: any) {
      console.error("Login error:", error);
      let errorMessage = "Failed to login. Please check your credentials.";
      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      }
      toast.error(errorMessage);
    } finally {
      console.log("Login process finished, setting loading to false");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore, if not create a profile
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

      toast.success("Logged in with Google!");
      navigate({ to: "/dashboard" });
    } catch (error: any) {
      console.error("Google login error:", error);
      toast.error(error.message || "Failed to login with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-2xl bg-card transition-colors duration-300">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-[family-name:var(--font-display)] font-extrabold text-center text-foreground">
                Student Login
              </CardTitle>
              <CardDescription className="text-center text-muted-foreground font-medium">
                Access your learning journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                type="button"
                className="w-full py-6 border-input flex items-center gap-3 font-bold hover:bg-accent hover:text-accent-foreground"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <Chrome className="size-5" />
                LOGIN WITH GOOGLE
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground font-bold">Or with email</span>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-bold">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background border-input text-foreground focus:ring-2 focus:ring-[color:var(--color-spark)]"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-foreground font-bold">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-xs text-[color:var(--color-spark)] font-bold hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
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
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 border-t border-border mt-4 pt-6">
              <div className="text-sm text-center text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-[color:var(--color-spark)] font-bold hover:underline">
                  Join the Academy
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
