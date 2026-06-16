import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-background py-12 px-6 md:px-20 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-6">
            <span className="size-6 bg-[color:var(--color-spark)] rounded-sm" />
            <span className="font-[family-name:var(--font-display)] font-extrabold tracking-tighter text-foreground">
              BRIGHT SPARK
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A communication-first English academy helping complete beginners
            become confident speakers.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/30">Academy</span>
            <Link to="/about" className="text-sm text-foreground hover:text-[color:var(--color-spark)]">About</Link>
            <Link to="/about" className="text-sm text-foreground hover:text-[color:var(--color-spark)]">Our Method</Link>
            <Link to="/contact" className="text-sm text-foreground hover:text-[color:var(--color-spark)]">Contact</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/30">Platform</span>
            <Link to="/login" className="text-sm text-foreground hover:text-[color:var(--color-spark)]">Login</Link>
            <Link to="/register" className="text-sm text-foreground hover:text-[color:var(--color-spark)]">Register</Link>
            <Link to="/contact" className="text-sm text-foreground hover:text-[color:var(--color-spark)]">Support</Link>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/30">Contact</span>
            <span className="text-sm text-muted-foreground break-all">brightsparkenglishacademy@gmail.com</span>
            <span className="text-sm text-muted-foreground">Bale Robe Zone, Oromia, Ethiopia</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border flex flex-col sm:flex-row sm:justify-between gap-2 text-[10px] text-muted-foreground/40 uppercase tracking-[0.2em] font-bold">
        <span>© {new Date().getFullYear()} Bright Spark English Academy</span>
        <span>From Beginner to Confident Speaker</span>
      </div>
    </footer>
  );
}