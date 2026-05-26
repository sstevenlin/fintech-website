"use client";

import AnimatedSection from "./AnimatedSection";

const stats = [
  { label: "Founded", value: "2021" },
  { label: "Active Members", value: "50+" },
  { label: "Projects", value: "4" },
  { label: "Events / Year", value: "20+" },
];

export default function About() {
  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2">
              <p className="text-cornell-red font-mono text-sm tracking-wider uppercase mb-4">
                Who We Are
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                Bridging finance
                <br />
                <span className="text-cornell-red">and technology</span>
              </h2>
            </div>
            <div className="lg:w-1/2 space-y-6">
              <p className="text-muted text-lg leading-relaxed">
                Cornell FinTech Club (CFT) is the first all-encompassing,
                undergraduate-led club that aims to create spaces and
                opportunities for students in fintech through projects,
                weekly discussions, new member education, and corporate events.
              </p>
              <p className="text-muted text-lg leading-relaxed">
                We foster an innovative environment by preparing students for
                the real world and creating impactful initiatives. Our work
                spans algorithmic trading, AI/ML, financial modeling, and
                web development.
              </p>
              <p className="text-muted text-lg leading-relaxed">
                CFT is supported by Fintech at Cornell, an Initiative of the
                SC Johnson College of Business. We open select events to both
                undergraduate and graduate students.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <div className="p-6 rounded-xl border border-border bg-surface/50 text-center hover:border-cornell-red/30 transition-colors">
                <p className="text-3xl sm:text-4xl font-bold text-cornell-red">
                  {stat.value}
                </p>
                <p className="text-muted text-sm mt-2">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
