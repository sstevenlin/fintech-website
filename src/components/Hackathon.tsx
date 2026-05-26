"use client";

import AnimatedSection from "./AnimatedSection";

const tracks = [
  "Digital Wallets",
  "Stablecoin",
  "XRPL",
  "Best Beginner Hack",
  "Best Design",
  "Most Promising Startup",
];

export default function Hackathon() {
  return (
    <section id="hackathon" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <AnimatedSection>
          <p className="text-cornell-red font-mono text-sm tracking-wider uppercase mb-4">
            Flagship Event
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Payments Innovations Hackathon
          </h2>
          <p className="text-muted text-lg max-w-2xl mb-16">
            A collaborative 3-day event bringing together undergraduate and
            graduate students to build the future of payments and fintech.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="p-8 rounded-xl border border-border bg-surface/50 h-full">
              <h3 className="text-2xl font-bold mb-6">Event Details</h3>
              <div className="space-y-4">
                {[
                  { label: "Date", value: "March 22 - 24, 2024" },
                  { label: "Location", value: "Warren Hall, Ithaca, NY" },
                  { label: "Team Size", value: "4 - 5 members" },
                  { label: "Grand Prize", value: "$3,000" },
                  { label: "2nd Place", value: "$2,000" },
                  { label: "Track Winners", value: "$1,000 each" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center py-3 border-b border-border last:border-0"
                  >
                    <span className="text-muted">{item.label}</span>
                    <span className="font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="p-8 rounded-xl border border-border bg-surface/50 h-full">
              <h3 className="text-2xl font-bold mb-6">Competition Tracks</h3>
              <div className="grid grid-cols-2 gap-3">
                {tracks.map((track) => (
                  <div
                    key={track}
                    className="p-4 rounded-lg border border-border bg-background/50 text-center hover:border-cornell-red/30 transition-colors"
                  >
                    <p className="text-sm font-medium">{track}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 rounded-lg bg-cornell-red/10 border border-cornell-red/20">
                <p className="text-sm text-cornell-red-light">
                  All students (undergrad and grad) are welcome! Various
                  educational sessions and resources available — no prior
                  experience needed.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.3}>
          <div className="mt-8 text-center">
            <p className="text-muted text-sm mb-2">
              Organized by FinTech at Cornell, Cornell FinTech Club &amp;
              Cornell High Tech Club
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
