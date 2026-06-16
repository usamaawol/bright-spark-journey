import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import * as React from "react";
import {
  MessageCircle, Lock, Trophy, Sparkles, HeartHandshake, Globe2,
  Mic, BookOpen, GraduationCap, Calendar, Headphones, Users, BarChart3, Languages,
  ArrowRight, Star, Quote, CheckCircle2,
} from "lucide-react";
import heroImg from "@/assets/hero-students.jpg";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bright Spark English Academy — From Beginner to Confident Speaker" },
      { name: "description", content: "An English communication academy for complete beginners. Speak English with confidence through real practice, weekly challenges, and an English-only zone." },
      { property: "og:title", content: "Bright Spark English Academy" },
      { property: "og:description", content: "From Beginner to Confident Speaker." },
    ],
  }),
  component: Index,
});

const whyCards = [
  { icon: MessageCircle, title: "Communication First", body: "We skip the textbook drills. From day one, you speak real sentences that matter." },
  { icon: Lock, title: "English Only Zone", body: "Total immersion in every session — the fastest way the brain rewires for fluency." },
  { icon: Trophy, title: "Weekly Speaking Challenges", body: "Real-world missions that grow your speed, courage, and vocabulary every week." },
  { icon: Sparkles, title: "Week's Spark Awards", body: "We celebrate grit. Earn digital badges for improvement, participation, and teamwork." },
  { icon: HeartHandshake, title: "Confidence Building", body: "Psychology-backed methods to overcome the fear of making mistakes." },
  { icon: Globe2, title: "Real-Life English", body: "Idioms, slang, and cultural nuance used in modern global workplaces and travel." },
];

const features = [
  { icon: Mic, label: "Spoken English" },
  { icon: BookOpen, label: "Practical Grammar" },
  { icon: Languages, label: "Vocabulary Growth" },
  { icon: Calendar, label: "Daily Expressions" },
  { icon: Headphones, label: "Pronunciation Practice" },
  { icon: Trophy, label: "Weekly Challenges" },
  { icon: Users, label: "Speaking Partner" },
  { icon: BarChart3, label: "Progress Tracking" },
];

const levels = [
  { tag: "Level 01", name: "Beginner", note: "Laying the groundwork." },
  { tag: "Level 02", name: "Explorer", note: "Simple daily conversations." },
  { tag: "Level 03", name: "Communicator", note: "Expressing ideas fluidly." },
  { tag: "Level 04", name: "Confident Speaker", note: "Handling complex topics." },
  { tag: "Level 05", name: "Bright Spark Champion", note: "Fluent and expressive." },
];

const badges = [
  { name: "The Igniter", note: "First spark" },
  { name: "Fluent Flow", note: "Smooth speaker" },
  { name: "Grammar Pro", note: "Structure mastery" },
  { name: "Peer Mentor", note: "Lifts others up" },
];

const testimonials = [
  { name: "Aisha R.", role: "Marketing Associate", body: "I was terrified of speaking. By week 6 I was leading a meeting in English. The English Only Zone changed everything." },
  { name: "Marco D.", role: "Engineer", body: "The weekly challenges forced me out of my comfort zone. I went from silent to actually expressing ideas." },
  { name: "Linh P.", role: "Student", body: "Best decision I made. The phase system is brilliant — by day 60 I was thinking in English." },
];

function Index() {
  return (
    <div className="font-[family-name:var(--font-body)] bg-background text-foreground selection:bg-[color:var(--color-spark)]/20">
      <Header />

      {/* Hero */}
      <section className="flex flex-col md:flex-row min-h-[90vh] border-b border-border overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-20 bg-background"
        >
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[color:var(--color-spark)] font-bold tracking-[0.2em] text-xs uppercase mb-6"
          >
            Premium English Academy
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-extrabold leading-[0.95] text-balance mb-8"
          >
            From Beginner to <span className="text-[color:var(--color-spark)]">Confident</span> Speaker.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg text-muted-foreground max-w-[45ch] mb-12 leading-relaxed"
          >
            Master fluent English communication through an immersive,
            speech-first method built for complete beginners.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/register">
              <button className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-sm text-sm uppercase tracking-widest hover:brightness-110 transition">
                Join Now
              </button>
            </Link>
            <Link to="/about">
              <button className="px-8 py-4 border-2 border-primary text-primary font-bold rounded-sm text-sm uppercase tracking-widest hover:bg-primary/5 transition">
                Explore Program
              </button>
            </Link>
          </motion.div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 bg-[color:var(--color-mid)] relative overflow-hidden min-h-[420px]"
        >
          <img
            src={heroImg}
            alt="Students laughing and speaking English together in a sunlit classroom"
            width={1280}
            height={1600}
            className="absolute inset-0 w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[color:var(--color-navy)]/40 via-transparent to-transparent" />
        </motion.div>
      </section>

      {/* Why Bright Spark */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="mb-16 max-w-2xl">
          <span className="text-[color:var(--color-spark)] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Why Bright Spark</span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold leading-tight">
            Built for speakers, not test-takers.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {whyCards.map((c, i) => (
            <motion.div 
              key={c.title} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card p-8 hover:bg-accent transition-colors group"
            >
              <c.icon className="size-7 text-[color:var(--color-spark)] mb-5 group-hover:scale-110 transition-transform" />
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2 text-card-foreground">{c.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 px-6 md:px-20 bg-background border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-extrabold mb-4 text-foreground">The Fluency Metamorphosis</h2>
            <div className="w-24 h-1.5 bg-[color:var(--color-spark)] mx-auto" />
          </div>

          <div className="space-y-12 relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

            {[
              { num: "01", phase: "Foundation", body: "Breaking the silence barrier and mastering the essential practical expressions.", aside: "Building the structural core and phonetic confidence.", dot: "border-[color:var(--color-spark)]", asideClass: "bg-card ring-1 ring-border text-foreground" },
              { num: "02", phase: "Confidence", body: "Spontaneous response training and emotional nuance in conversation.", aside: "Eliminating the mental translation delay.", dot: "border-primary", asideClass: "bg-card ring-1 ring-border text-foreground" },
              { num: "03", phase: "Communication", body: "Complex negotiation, storytelling, and professional-grade public speaking.", aside: "Becoming a Bright Spark Champion.", dot: "border-[color:var(--color-spark)] bg-[color:var(--color-spark)]", asideClass: "bg-primary text-primary-foreground" },
            ].map((p, i) => (
              <div key={p.num} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-20 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? "md:text-right" : ""}`}>
                  <h3 className={`font-[family-name:var(--font-display)] text-2xl font-bold ${i === 2 ? "text-[color:var(--color-spark)]" : "text-primary"}`}>
                    {p.num} / {p.phase}
                  </h3>
                  <p className="text-muted-foreground mt-2">{p.body}</p>
                </div>
                <div className={`absolute left-4 md:left-1/2 size-8 bg-background border-4 ${p.dot} rounded-full -translate-x-1/2 z-10`} />
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? "" : "md:text-right"}`}>
                  <div className={`p-6 rounded-lg ${p.asideClass}`}>{p.aside}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 md:px-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-xl">
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold mb-6 leading-tight">Everything you need to succeed.</h2>
              <p className="text-primary-foreground/70 text-lg">We've designed a comprehensive ecosystem that supports your learning 24/7.</p>
            </div>
            <Link to="/register">
              <button className="px-8 py-4 bg-background text-foreground font-bold rounded-sm text-sm uppercase tracking-widest hover:bg-accent transition">
                Start Learning
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((f) => (
              <div key={f.label} className="flex items-center gap-4 group">
                <div className="size-12 rounded-sm bg-background/10 flex items-center justify-center group-hover:bg-[color:var(--color-spark)] transition-colors">
                  <f.icon className="size-6 text-primary-foreground" />
                </div>
                <span className="font-bold uppercase tracking-wider text-xs">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Pathway */}
      <section className="py-24 px-6 md:px-20 bg-background border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-extrabold mb-4 text-foreground">The Pathway to Mastery</h2>
            <p className="text-muted-foreground">Watch your status evolve as you unlock new levels of fluency.</p>
          </div>
          <div className="flex flex-col gap-4">
            {levels.map((l, i) => {
              const isChampion = i === levels.length - 1;
              const isCurrent = i === 2;
              return (
                <div
                  key={l.tag}
                  className={`flex flex-wrap items-center gap-4 md:gap-6 p-6 rounded-lg border ${
                    isChampion
                      ? "bg-[color:var(--color-gold)]/10 border-[color:var(--color-gold)]"
                      : isCurrent
                      ? "bg-card border-[color:var(--color-spark)] ring-2 ring-[color:var(--color-spark)]/20"
                      : "bg-card border-border"
                  }`}
                >
                  <span className="font-[family-name:var(--font-display)] font-extrabold text-muted-foreground/30 text-xl w-10">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                    isChampion ? "bg-[color:var(--color-gold)] text-black" :
                    isCurrent ? "bg-[color:var(--color-spark)] text-white" :
                    "bg-accent text-accent-foreground"
                  }`}>
                    {l.name}
                  </span>
                  <div className="h-px flex-1 min-w-8 bg-border" />
                  <span className="text-sm text-muted-foreground">{l.note}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Week's Spark Badges */}
      <section className="bg-primary py-24 px-6 md:px-20 text-primary-foreground overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/3">
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-extrabold mb-6 leading-tight">
              Earn Your <br />
              <span className="text-[color:var(--color-gold)]">Weekly Sparks</span>
            </h2>
            <p className="text-primary-foreground/60 mb-8">
              Our gamified recognition system keeps you motivated. Every week,
              top performers earn exclusive digital credentials for
              participation, improvement, English usage, and teamwork.
            </p>
            <button className="group flex items-center gap-3 font-bold text-sm tracking-widest">
              VIEW ALL BADGES
              <ArrowRight className="size-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
          <div className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((b, i) => (
              <div
                key={b.name}
                className="aspect-square bg-white/5 rounded-2xl flex flex-col items-center justify-center border border-white/10 group hover:bg-[color:var(--color-spark)] transition-colors p-4 text-center"
              >
                <div className={`size-12 ${i === 0 ? "bg-[color:var(--color-gold)]/20" : "bg-white/10"} rounded-full mb-4 grid place-items-center group-hover:bg-white/20`}>
                  <Sparkles className="size-5 text-[color:var(--color-gold)] group-hover:text-white" />
                </div>
                <span className="text-[10px] uppercase tracking-tighter font-bold block">{b.name}</span>
                <span className="text-[10px] text-white/40 mt-1">{b.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Info */}
      <section className="py-24 px-6 md:px-20 bg-background border-y border-border overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <span className="text-[color:var(--color-spark)] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Personalized Learning</span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Meet Sparky, Your <span className="text-[color:var(--color-spark)]">AI Learning Companion</span>.
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Available exclusively for enrolled students, our AI Assistant helps you with grammar, vocabulary, pronunciation, and speaking practice 24/7. It's like having a personal mentor in your pocket.
            </p>
            <div className="space-y-4 mb-8">
              {[
                "Instant Grammar Explanations",
                "Vocabulary Building & Phrases",
                "Real-time Pronunciation Guidance",
                "Personalized Study Recommendations",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="size-5 rounded-full bg-[color:var(--color-spark)]/10 flex items-center justify-center">
                    <CheckCircle2 className="size-3 text-[color:var(--color-spark)]" />
                  </div>
                  <span className="text-sm font-semibold text-[color:var(--color-navy)] dark:text-slate-200">{item}</span>
                </div>
              ))}
            </div>
            <Link to="/register">
              <button className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-sm text-sm uppercase tracking-widest hover:brightness-110 transition">
                Enroll to Access Sparky
              </button>
            </Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 relative"
          >
            <div className="aspect-square bg-gradient-to-br from-[color:var(--color-spark)]/20 to-transparent rounded-full absolute inset-0 blur-3xl -z-10" />
            <div className="bg-card ring-1 ring-border rounded-2xl p-8 shadow-2xl relative">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
                <div className="size-12 rounded-full bg-[color:var(--color-spark)] grid place-items-center">
                  <Sparkles className="text-white size-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Sparky AI</h4>
                  <p className="text-xs text-muted-foreground">Always active for students</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-accent rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                  <p className="text-sm">Hi! I can help you practice your speaking today. Would you like to try a role-play or learn some new idioms?</p>
                </div>
                <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-none p-4 max-w-[80%] ml-auto">
                  <p className="text-sm">I'd like to practice ordering food at a restaurant!</p>
                </div>
                <div className="bg-accent rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                  <p className="text-sm">Great choice! 🍕 I'll be the waiter. "Welcome to Bright Spark Bistro! Are you ready to order?"</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Learning Pillars */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[color:var(--color-spark)] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">The Core</span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold leading-tight">The Four Pillars of Fluency.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Vocabulary", desc: "Daily words, synonyms, antonyms, and word families with practical examples.", icon: BookOpen },
            { title: "Phrases", desc: "Common expressions, idioms, phrasal verbs, and daily communication slang.", icon: MessageCircle },
            { title: "Pronunciation", desc: "Master IPA, word stress, intonation, and those tricky silent letters.", icon: Mic },
            { title: "Spoken Grammar", desc: "Parts of speech, tenses, and sentence structures built for conversation.", icon: GraduationCap },
          ].map((pillar) => (
            <div key={pillar.title} className="bg-card p-8 ring-1 ring-border rounded-2xl hover:ring-[color:var(--color-spark)]/40 transition group">
              <div className="size-14 rounded-2xl bg-[color:var(--color-spark)]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <pillar.icon className="size-7 text-[color:var(--color-spark)]" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-3">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-20 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-foreground">What our students say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="p-10 bg-card border border-border relative">
                <Quote className="absolute top-6 left-6 size-8 text-primary/5" />
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-[color:var(--color-spark)] text-[color:var(--color-spark)]" />)}
                </div>
                <p className="text-lg mb-8 italic text-card-foreground">"{t.body}"</p>
                <div>
                  <div className="font-bold text-foreground">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 md:px-20 bg-background border-t border-border">
        <div className="max-w-4xl mx-auto bg-primary text-primary-foreground rounded-2xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute -top-20 -right-20 size-64 bg-[color:var(--color-spark)]/20 rounded-full blur-3xl" />
          <div className="relative">
            <GraduationCap className="size-10 text-[color:var(--color-gold)] mx-auto mb-6" />
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
              Your journey to fluency starts today.
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
              Limited cohort sizes keep speaking time per student high. Reserve your seat now.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-4 bg-[color:var(--color-spark)] text-white font-bold rounded-sm text-sm uppercase tracking-widest hover:brightness-110 transition">
                Reserve My Spot
              </button>
              <Link to="/contact" className="px-8 py-4 border border-white/30 text-white font-bold rounded-sm text-sm uppercase tracking-widest hover:bg-white/10 transition">
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
