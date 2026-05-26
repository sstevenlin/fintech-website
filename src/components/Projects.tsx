"use client";

import AnimatedSection from "./AnimatedSection";

const projects = [
  {
    name: "FinBot",
    tag: "AI / NLP",
    description:
      "An intelligent chatbot leveraging natural language processing to provide real-time financial insights and market analysis for students and investors.",
  },
  {
    name: "Portfolio Optimization",
    tag: "Quant Finance",
    description:
      "Building quantitative models for optimal portfolio allocation using modern portfolio theory, risk modeling, and machine learning techniques.",
  },
  {
    name: "Big Red Link",
    tag: "Web Development",
    description:
      "A full-stack platform connecting Cornell students with fintech opportunities, internships, and networking resources across the industry.",
  },
  {
    name: "GenAI x Millennium",
    tag: "Partnership",
    description:
      "A collaborative project with Millennium Management exploring generative AI applications in quantitative trading and investment strategies.",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <AnimatedSection>
          <p className="text-cornell-red font-mono text-sm tracking-wider uppercase mb-4">
            What We Build
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Projects</h2>
          <p className="text-muted text-lg max-w-2xl mb-16">
            Members work in cross-functional teams spanning product management,
            software engineering, and business analysis to build impactful
            fintech solutions.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <AnimatedSection key={project.name} delay={i * 0.1}>
              <div className="group p-8 rounded-xl border border-border bg-surface/50 hover:border-cornell-red/30 transition-all hover:bg-surface">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold group-hover:text-cornell-red transition-colors">
                    {project.name}
                  </h3>
                  <span className="text-xs font-mono text-cornell-red bg-cornell-red/10 px-3 py-1 rounded-full whitespace-nowrap">
                    {project.tag}
                  </span>
                </div>
                <p className="text-muted leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm text-muted group-hover:text-cornell-red transition-colors">
                  <span>Learn more</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
