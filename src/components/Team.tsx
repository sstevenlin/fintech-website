"use client";

import Image from "next/image";
import AnimatedSection from "./AnimatedSection";

interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  linkedin?: string;
}

const teamSections: { title: string; members: TeamMember[] }[] = [
  {
    title: "Executive Board",
    members: [
      { name: "Saanvi Ibrahimpatnam", role: "Co-President", photo: "/images/saanvi.jpg", linkedin: "https://www.linkedin.com/in/saanvi-ibrahimpatnam/" },
      { name: "Steven Lin", role: "Co-President", photo: "/images/steven.jpg", linkedin: "https://www.linkedin.com/in/steven-lin-/" },
      { name: "Nicholas Grabowski", role: "VP of Internal" },
      { name: "Arin Barde", role: "VP of Recruitment" },
      { name: "Simran Duggi", role: "VP of Marketing" },
      { name: "Matthew Hui", role: "Finance Lead" },
    ],
  },
  {
    title: "Product Team",
    members: [
      { name: "Aidan Swan", role: "Product Manager" },
      { name: "Francesca Azzarito", role: "Product Manager" },
      { name: "Saanvi Ibrahimpatnam", role: "Product Manager", photo: "/images/saanvi.jpg", linkedin: "https://www.linkedin.com/in/saanvi-ibrahimpatnam/" },
      { name: "Anthony Manjarrez", role: "Associate PM" },
      { name: "Alyssa Hsu", role: "Technical PM" },
      { name: "Wyatt Cox", role: "Associate PM" },
    ],
  },
  {
    title: "Business & Investment",
    members: [
      { name: "Lawrence Han", role: "Business Analyst" },
      { name: "Hanny Wu", role: "Business Analyst" },
      { name: "Amisha Jain", role: "Business Analyst" },
      { name: "Alex Salvatore", role: "Business Analyst" },
      { name: "Rhea Barot", role: "Business Analyst" },
    ],
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

function MemberCard({ member }: { member: TeamMember }) {
  const Wrapper = member.linkedin ? "a" : "div";
  const wrapperProps = member.linkedin
    ? { href: member.linkedin, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`group rounded-2xl border border-border bg-surface/50 overflow-hidden hover:border-cornell-red/30 transition-all ${member.linkedin ? "cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:shadow-cornell-red/10" : ""}`}
    >
      <div className="aspect-[4/5] relative overflow-hidden bg-black">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            unoptimized
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-cornell-red/5">
            <span className="text-5xl font-bold text-cornell-red/30">
              {getInitials(member.name)}
            </span>
          </div>
        )}
        {member.linkedin && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <div className="flex items-center gap-2 text-white text-sm font-medium">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              View LinkedIn
            </div>
          </div>
        )}
      </div>
      <div className="p-5">
        <h4 className="font-semibold text-lg">{member.name}</h4>
        <p className="text-cornell-red text-sm mt-1">{member.role}</p>
      </div>
    </Wrapper>
  );
}

export default function Team() {
  return (
    <section id="team" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <AnimatedSection>
          <p className="text-cornell-red font-mono text-sm tracking-wider uppercase mb-4">
            Our People
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">The Team</h2>
          <p className="text-muted text-lg max-w-2xl mb-16">
            Founded in August 2021, CFT brings together students from across
            Cornell&apos;s undergraduate colleges and majors.
          </p>
        </AnimatedSection>

        <div className="space-y-20">
          {teamSections.map((section, si) => (
            <AnimatedSection key={section.title} delay={si * 0.1}>
              <h3 className="text-2xl font-bold mb-8 text-center">
                {section.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.members.map((member) => (
                  <MemberCard
                    key={`${member.name}-${member.role}`}
                    member={member}
                  />
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
