import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Target, Eye, BookOpen, MessageCircle, Zap, Lock, ShieldCheck, Trophy, Users, Heart, Sparkles, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    title: "About — Bright Spark English Academy",
    meta: [
      { name: "description", content: "Our mission, vision, and the Bright Spark Method: a communication-first English academy for complete beginners." },
      { property: "og:title", content: "About Bright Spark English Academy" },
      { property: "og:description", content: "Communication over memorization. Learn → Practice → Speak → Improve." },
    ],
  }),
  component: AboutPage,
});

const method = [
  { icon: MessageCircle, title: "Communication First" },
  { icon: Zap, title: "Speak From Day One" },
  { icon: BookOpen, title: "Learn By Doing" },
  { icon: Lock, title: "English Only Zone" },
  { icon: ShieldCheck, title: "Confidence Before Perfection" },
  { icon: Trophy, title: "Weekly Challenges" },
  { icon: Sparkles, title: "Practical Vocabulary" },
  { icon: Users, title: "Real-Life Conversations" },
];

const values = [
  { icon: ShieldCheck, name: "Confidence" },
  { icon: TrendingUp, name: "Consistency" },
  { icon: MessageCircle, name: "Communication" },
  { icon: Sparkles, name: "Growth" },
  { icon: Heart, name: "Respect" },
  { icon: Users, name: "Teamwork" },
];

function AboutPage() {
  return (
    <div className="font-[family-name:var(--font-body)] bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="py-24 px-6 md:px-20 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto">
          <span className="text-[color:var(--color-spark)] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">About the Academy</span>
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-extrabold leading-[1.05] mb-6 text-foreground">
            Communication over <span className="text-[color:var(--color-spark)]">memorization</span>.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-4">
            Bright Spark English Academy was built on one belief: complete beginners
            can become confident English speakers — if they actually
            speak from day one.
          </p>
          <p className="text-lg text-[color:var(--color-spark)] font-[family-name:var(--font-display)] font-bold">
            Located in Bale Robe Zone, Oromia Region, Ethiopia.
          </p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto grid md:grid-cols-2 gap-px bg-border">
        <div className="bg-card p-10">
          <Target className="size-7 text-[color:var(--color-spark)] mb-5" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-3 text-card-foreground">Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            Help complete beginners gain confidence in English communication
            through active practice, daily expression drills, and a fully
            immersive English-only environment.
          </p>
        </div>
        <div className="bg-card p-10">
          <Eye className="size-7 text-[color:var(--color-spark)] mb-5" />
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-3 text-card-foreground">Vision</h2>
          <p className="text-muted-foreground leading-relaxed">
            Create a global network of confident English speakers — people who
            never let language limit their ambition, their voice, or their reach.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-6 md:px-20 bg-background border-y border-border">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-extrabold mb-4 text-foreground">Our learning process</h2>
          <p className="text-muted-foreground mb-12">A loop that builds real fluency — not test scores.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-lg font-[family-name:var(--font-display)] font-bold">
            {["Learn", "Practice", "Speak", "Improve"].map((s, i, arr) => (
              <div key={s} className="flex items-center gap-4">
                <span className="px-6 py-3 rounded-sm border-2 border-primary text-foreground">{s}</span>
                {i < arr.length - 1 && <span className="text-[color:var(--color-spark)]">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bright Spark Method */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-[color:var(--color-spark)] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">The Method</span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold leading-tight text-foreground">The Bright Spark Method.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {method.map((m) => (
            <div key={m.title} className="bg-card p-6 hover:bg-accent transition-colors group">
              <m.icon className="size-6 text-[color:var(--color-spark)] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-[family-name:var(--font-display)] font-bold text-card-foreground">{m.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Academy Journey */}
      <section className="py-24 px-6 md:px-20 bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-extrabold mb-12">The Academy Journey</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { m: "Phase 1", phase: "Foundation Phase", body: "Pronunciation, core grammar, and high-frequency expressions." },
              { m: "Phase 2", phase: "Confidence Phase", body: "Spontaneous speech, role-plays, and speaking challenges." },
              { m: "Phase 3", phase: "Communication Phase", body: "Real conversations, storytelling, and professional fluency." },
            ].map((m, i) => (
              <div key={m.m} className={`p-8 rounded-lg border ${i === 2 ? "border-[color:var(--color-spark)] bg-[color:var(--color-spark)]/10" : "border-white/10 bg-white/5"}`}>
                <span className="text-[color:var(--color-gold)] text-xs uppercase tracking-widest font-bold">{m.m}</span>
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mt-2 mb-3">{m.phase}</h3>
                <p className="text-primary-foreground/60 text-sm leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-foreground">Academy Values</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {values.map((v) => (
            <div key={v.name} className="bg-card p-6 ring-1 ring-border rounded-lg flex flex-col items-center text-center gap-3 hover:ring-[color:var(--color-spark)]/40 transition">
              <v.icon className="size-6 text-[color:var(--color-spark)]" />
              <span className="font-[family-name:var(--font-display)] font-bold text-card-foreground">{v.name}</span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}