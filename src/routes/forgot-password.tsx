import { createFileRoute, Link } from "@tanstack/react-router";
import * as React from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordComponent,
});

function ForgotPasswordComponent() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
      toast.success("Password reset email sent!");
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--color-canvas)]">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-[family-name:var(--font-display)] font-extrabold text-center">
                Reset Password
              </CardTitle>
              <CardDescription className="text-center">
                {sent 
                  ? "Check your inbox for the reset link" 
                  : "Enter your email to receive a password reset link"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!sent ? (
                <form onSubmit={handleReset} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/50 border-[color:var(--color-navy)]/10"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[color:var(--color-navy)] hover:bg-[color:var(--color-navy)]/90 text-white font-bold py-6"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "SEND RESET LINK"}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm text-[color:var(--color-navy)]/60 mb-6">
                    If an account exists with that email, you will receive a link to reset your password shortly.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSent(false)}
                    className="w-full border-[color:var(--color-navy)]/10"
                  >
                    Try another email
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Link 
                to="/login" 
                className="flex items-center gap-2 text-sm font-bold text-[color:var(--color-navy)] hover:text-[color:var(--color-spark)] transition-colors mx-auto"
              >
                <ChevronLeft className="size-4" />
                Back to Login
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
