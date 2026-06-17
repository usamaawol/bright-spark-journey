import { Link, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { Menu, X, LogOut, User as UserIcon, Sun, Moon } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/hooks/use-theme";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/announcements", label: "Announcements" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = React.useState(false);
  const { user, profile } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate({ to: "/" });
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-[color:var(--color-navy)]/5 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:flex md:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center bg-[color:var(--color-spark)] rounded-sm">
            <span className="size-3 bg-white rotate-45" />
          </span>
          <span className="font-[family-name:var(--font-display)] font-extrabold tracking-tighter text-lg sm:text-xl text-[color:var(--color-navy)] dark:text-white truncate">
            BRIGHT SPARK
          </span>
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-semibold uppercase tracking-widest text-[color:var(--color-navy)] dark:text-slate-200">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="hover:text-[color:var(--color-spark)] transition-colors"
              activeProps={{ className: "text-[color:var(--color-spark)]" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex gap-3 items-center">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-[color:var(--color-navy)]/5 dark:hover:bg-slate-700 text-[color:var(--color-navy)] dark:text-slate-200 transition-colors"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[color:var(--color-navy)]/10 dark:border-slate-700 hover:bg-[color:var(--color-navy)]/5 dark:hover:bg-slate-700 transition-all">
                  {profile?.photoURL ? (
                    <img 
                      src={profile.photoURL} 
                      alt="Profile" 
                      className="size-7 rounded-full object-cover border border-[color:var(--color-navy)]/10 dark:border-slate-700"
                    />
                  ) : (
                    <div className="size-7 rounded-full bg-[color:var(--color-spark)] text-white grid place-items-center text-xs font-bold">
                      {profile?.fullName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-bold text-[color:var(--color-navy)] dark:text-white max-w-[100px] truncate">
                    {profile?.fullName || "Student"}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 dark:bg-slate-800 dark:border-slate-700">
                <DropdownMenuLabel className="dark:text-slate-200">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="dark:bg-slate-700" />
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="cursor-pointer flex items-center gap-2 dark:text-slate-200">
                    <UserIcon className="size-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="dark:bg-slate-700" />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer flex items-center gap-2">
                  <LogOut className="size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <button className="px-5 py-2 text-sm font-bold border border-[color:var(--color-navy)]/10 dark:border-slate-700 rounded-sm hover:bg-[color:var(--color-navy)] hover:text-white dark:hover:bg-slate-700 dark:text-slate-200 transition-all text-[color:var(--color-navy)]">
                  LOGIN
                </button>
              </Link>
              <Link to="/register">
                <button className="px-5 py-2 text-sm font-bold bg-[color:var(--color-spark)] text-white rounded-sm shadow-lg shadow-[color:var(--color-spark)]/20 hover:brightness-110 transition">
                  JOIN NOW
                </button>
              </Link>
            </>
          )}
        </div>
        <button
          aria-label="Toggle navigation"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden shrink-0 p-2 text-[color:var(--color-navy)] dark:text-white"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[color:var(--color-navy)]/5 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-4 flex flex-col gap-4">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="text-sm font-semibold uppercase tracking-widest text-[color:var(--color-navy)] dark:text-white"
            >
              {n.label}
            </Link>
          ))}
          {user ? (
            <div className="flex flex-col gap-2 pt-2 border-t border-[color:var(--color-navy)]/5 dark:border-slate-700">
              <Link to="/dashboard" onClick={() => setOpen(false)} className="text-sm font-bold text-[color:var(--color-navy)] dark:text-white">
                DASHBOARD
              </Link>
              <button onClick={handleLogout} className="text-sm font-bold text-destructive text-left uppercase">
                LOGOUT
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login" onClick={() => setOpen(false)}>
                <button className="w-full px-5 py-3 text-sm font-bold border border-[color:var(--color-navy)]/10 dark:border-slate-700 rounded-sm dark:text-white">
                  LOGIN
                </button>
              </Link>
              <Link to="/register" onClick={() => setOpen(false)}>
                <button className="w-full px-5 py-3 text-sm font-bold bg-[color:var(--color-spark)] text-white rounded-sm">
                  JOIN NOW
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}