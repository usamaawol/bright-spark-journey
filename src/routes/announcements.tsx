import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Megaphone, Loader2 } from "lucide-react";

export const Route = createFileRoute("/announcements")({
  head: () => ({
    title: "Announcements — Bright Spark English Academy",
    meta: [
      { name: "description", content: "Latest updates and announcements from Bright Spark English Academy." },
      { property: "og:title", content: "Announcements | Bright Spark English Academy" },
      { property: "og:description", content: "Stay updated with the latest news and events from Bright Spark English Academy." },
    ],
  }),
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  const [announcements, setAnnouncements] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const snapshot = await getDocs(collection(db, "announcements"));
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Show only visible announcements and sort by newest first
        setAnnouncements(
          data.filter(a => a.visible).sort((a, b) => {
            const timeA = a.createdAt?.toMillis?.() || 0;
            const timeB = b.createdAt?.toMillis?.() || 0;
            return timeB - timeA;
          })
        );
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  return (
    <div className="font-[family-name:var(--font-body)] bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="py-24 px-6 md:px-20 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto">
          <span className="text-[color:var(--color-spark)] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">Academy Updates</span>
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-extrabold leading-[1.05] mb-6 text-foreground">
            Latest Announcements
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Stay updated with news, events, and important information from Bright Spark English Academy.
          </p>
        </div>
      </section>

      {/* Announcements List */}
      <section className="py-24 px-6 md:px-20 max-w-4xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="size-10 text-[color:var(--color-spark)] animate-spin" />
            <p className="text-muted-foreground mt-4">Loading announcements...</p>
          </div>
        ) : announcements.length === 0 ? (
          <div className="text-center py-20">
            <Megaphone className="size-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-xl font-[family-name:var(--font-display)] font-bold text-muted-foreground">No announcements yet</h3>
            <p className="text-muted-foreground mt-2">Check back soon for updates!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="bg-card border border-border p-8 rounded-lg shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="size-12 rounded-full bg-[color:var(--color-spark)]/10 text-[color:var(--color-spark)] flex items-center justify-center shrink-0">
                    <Megaphone className="size-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-card-foreground mb-3">
                      {announcement.title}
                    </h2>
                    <p className="text-card-foreground/80 leading-relaxed text-lg">
                      {announcement.content}
                    </p>
                    {announcement.createdAt && (
                      <p className="text-xs text-muted-foreground mt-4 uppercase tracking-wider">
                        {new Date(announcement.createdAt.toMillis()).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
