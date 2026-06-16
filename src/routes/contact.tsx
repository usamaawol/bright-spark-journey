import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Mail, Phone, MapPin, ChevronDown, Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Bright Spark English Academy" },
      { name: "description", content: "Get in touch with Bright Spark English Academy. Questions about our program, enrollment, or anything else." },
      { property: "og:title", content: "Contact Bright Spark English Academy" },
      { property: "og:description", content: "We'd love to hear from you." },
    ],
  }),
  component: Contact,
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(5, "Phone is required").max(30),
  message: z.string().trim().min(5, "Message is required").max(1000),
});

const faqs = [
  { q: "How long is the program?", a: "The Bright Spark Academy offers a continuous learning path split into progressive phases: Foundation, Confidence, and Communication, allowing students to advance at their own pace." },
  { q: "Who can join?", a: "Anyone 16+ who wants to speak English with confidence. The program is designed specifically for complete beginners — but motivated intermediate learners benefit too." },
  { q: "Do I need prior English knowledge?", a: "No. The program starts from absolute zero and builds your speaking ability through guided immersion." },
  { q: "How are classes conducted?", a: "Live group sessions in an English-only environment, weekly speaking challenges, daily expression drills, and a Speaking Partner Program." },
  { q: "Will I get personal feedback?", a: "Yes. Every student receives weekly progress feedback and personal coaching during live sessions." },
];

function Contact() {
  const [form, setForm] = React.useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) errs[issue.path[0] as string] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    
    try {
      await addDoc(collection(db, "contacts"), {
        ...result.data,
        createdAt: serverTimestamp(),
        status: "new",
      });
      
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", message: "" });
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-[family-name:var(--font-body)] bg-background text-foreground">
      <Header />

      <section className="py-20 px-6 md:px-20 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto">
          <span className="text-[color:var(--color-spark)] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">Contact</span>
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-extrabold leading-[1.05] mb-4 text-foreground">
            Let's spark a conversation.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Questions about the program, enrollment, or partnerships — we usually reply within one business day.
          </p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-12">
        {/* Form */}
        <form onSubmit={onSubmit} className="bg-card ring-1 ring-border rounded-lg p-8 md:p-10 shadow-sm">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-6 text-card-foreground">Send a message</h2>

          {submitted && (
            <div className="mb-6 flex items-center gap-3 p-4 rounded-sm bg-[color:var(--color-spark)]/10 text-foreground">
              <CheckCircle2 className="size-5 text-[color:var(--color-spark)] shrink-0" />
              <span className="text-sm">Thanks — your message is in. We'll be in touch shortly.</span>
            </div>
          )}

          {(["name","email","phone"] as const).map((field) => (
            <div key={field} className="mb-5">
              <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-muted-foreground">
                {field === "name" ? "Full Name" : field === "email" ? "Email" : "Phone Number"}
              </label>
              <input
                type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                value={form[field]}
                onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                className="w-full px-4 py-3 border border-input rounded-sm focus:outline-none focus:border-[color:var(--color-spark)] transition bg-background text-foreground"
              />
              {errors[field] && <p className="text-xs text-red-600 mt-1">{errors[field]}</p>}
            </div>
          ))}

          <div className="mb-6">
            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-muted-foreground">Message</label>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full px-4 py-3 border border-input rounded-sm focus:outline-none focus:border-[color:var(--color-spark)] transition bg-background text-foreground resize-none"
            />
            {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-sm text-sm uppercase tracking-widest hover:bg-[color:var(--color-spark)] hover:text-white transition inline-flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? "Sending..." : <><Send className="size-4" /> Send Message</>}
          </button>
        </form>

        {/* Contact info */}
        <div className="flex flex-col gap-4">
          {[
            { icon: Mail, label: "Email", value: "brightsparkenglishacademy@gmail.com" },
            { icon: Phone, label: "Phone", value: "+251 911 123 456" },
            { icon: MapPin, label: "Address", value: "Ethiopia, Oromia Region, Bale Robe Zone" },
          ].map((item) => (
            <div key={item.label} className="bg-card ring-1 ring-border rounded-lg p-6 flex items-start gap-4 shadow-sm">
              <div className="size-12 shrink-0 grid place-items-center rounded-sm bg-[color:var(--color-spark)]/10">
                <item.icon className="size-5 text-[color:var(--color-spark)]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{item.label}</div>
                <div className="font-[family-name:var(--font-display)] font-bold text-card-foreground break-words">{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-20 bg-background border-t border-border">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[color:var(--color-spark)] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">FAQ</span>
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-foreground">Questions, answered.</h2>
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className="border border-border rounded-sm bg-card">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  >
                    <span className="font-[family-name:var(--font-display)] font-bold text-card-foreground">{f.q}</span>
                    <ChevronDown className={`size-5 shrink-0 transition-transform ${open ? "rotate-180 text-[color:var(--color-spark)]" : "text-muted-foreground/40"}`} />
                  </button>
                  {open && (
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}