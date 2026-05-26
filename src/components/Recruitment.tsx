"use client";

import AnimatedSection from "./AnimatedSection";

const roles = [
  {
    title: "Technical Product / Product Manager",
    description:
      "Define product strategy, features, and roadmaps for our fintech projects. Lead cross-functional teams from ideation to launch.",
    skills: ["Product Strategy", "User Research", "Agile"],
  },
  {
    title: "Financial Software Engineer",
    description:
      "Develop and ship the products powering our fintech initiatives. Work with modern tech stacks and financial APIs.",
    skills: ["Python / TypeScript", "ML / AI", "Web Dev"],
  },
  {
    title: "Business Analyst",
    description:
      "Drive investment analyses, market research, and business strategy to inform our projects and competitions.",
    skills: ["Financial Modeling", "Market Research", "Strategy"],
  },
];

const timeline = [
  { date: "Jan 22", event: "Info Session #1", detail: "Statler 396, 6:30 PM" },
  { date: "Jan 24", event: "ClubFest", detail: "Barton, 12:00 PM" },
  { date: "Late Jan", event: "Joint Sessions", detail: "With partner clubs" },
  { date: "Feb 4", event: "Application Deadline", detail: "Midnight EST" },
  { date: "TBD", event: "Interviews", detail: "By invitation" },
];

export default function Recruitment() {
  return (
    <section id="recruitment" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-cornell-red font-mono text-sm tracking-wider uppercase mb-4">
            Join the Team
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Recruitment</h2>
          <p className="text-muted text-lg max-w-2xl mb-16">
            We recruit members on a rolling basis each semester. Work on
            cutting-edge projects spanning algorithmic trading, AI, ML, NLP,
            web development, and financial modeling.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {roles.map((role, i) => (
            <AnimatedSection key={role.title} delay={i * 0.1}>
              <div className="group p-8 rounded-xl border border-border bg-surface/50 hover:border-cornell-red/30 transition-all h-full flex flex-col">
                <h3 className="text-lg font-semibold mb-3 group-hover:text-cornell-red transition-colors">
                  {role.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed flex-1">
                  {role.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {role.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-mono px-3 py-1 rounded-full border border-border text-muted"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="p-8 rounded-xl border border-border bg-surface/50">
            <h3 className="text-2xl font-bold mb-8">
              Recruitment Timeline
            </h3>
            <div className="relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-border" />
              <div className="space-y-6">
                {timeline.map((item, i) => (
                  <div key={i} className="flex items-start gap-6 relative">
                    <div className="w-4 h-4 rounded-full bg-cornell-red border-4 border-background flex-shrink-0 mt-1 z-10" />
                    <div>
                      <p className="font-semibold">{item.event}</p>
                      <p className="text-muted text-sm">
                        {item.date} &middot; {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:asb385@cornell.edu"
                className="px-6 py-3 bg-cornell-red text-white rounded-lg font-medium hover:bg-cornell-red-light transition-colors text-center"
              >
                Contact VP of Recruitment
              </a>
              <a
                href="mailto:cornellfintechclub@gmail.com"
                className="px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-surface transition-colors text-center"
              >
                General Inquiries
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
