import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { WindowCard } from "./WindowCard";

const experiences = [
  {
    title: "AI Policy Engineer",
    company: "Independent Consultant",
    type: "Self-employed",
    period: "Oct 2023 – Present",
    location: "Philadelphia, PA",
    highlights: [
      "Built FERPA & Title IX compliance dashboards for school districts",
      "Launched AI consultancy delivering automation prototypes for SMBs",
      "Led 3 proof-of-concept studies translating policy into controls",
      "Developed GPT-4 & Claude tools to extract regulatory requirements",
      "Conducted NIST AI RMF feasibility assessments with risk registers",
      "Integrated open-source LLMs, reducing infrastructure costs by 40%",
    ],
  },
  {
    title: "Penetration Tester",
    company: "Defense Intelligence Agency & Lockheed Martin",
    type: "Contract",
    period: "Nov 2024 – May 2025",
    location: "Remote (DC)",
    highlights: [
      "Executed 12+ authorized penetration tests across federal systems",
      "Identified 47 critical vulnerabilities with remediation roadmaps",
      "Reduced incidents by 30% through proactive OSINT reconnaissance",
      "Briefed senior stakeholders with risk-prioritized action plans",
    ],
  },
  {
    title: "Management Consulting Analyst",
    company: "Accenture Federal Services",
    type: "Full-time",
    period: "Jul 2021 – Oct 2024",
    location: "Washington, DC",
    highlights: [
      "Optimized DoD capital project portfolios improving utilization by 30%",
      "Developed compliance frameworks for Defense Logistics Agency",
      "Designed UX/UI and content strategy for DOE public websites",
      "Achieved 15% operational cost reduction through analysis",
    ],
  },
  {
    title: "Business Analyst",
    company: "SAS / SAP SuccessFactors",
    type: "Full-time",
    period: "Dec 2019 – Mar 2021",
    location: "Newtown Square, PA",
    highlights: [
      "Produced ROI analyses guiding enterprise budget allocation",
      "Improved operational efficiency by 25% via data insights",
      "Reduced data retrieval time by 30% through process redesign",
    ],
  },
];

export const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="relative py-16 sm:py-20 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 space-y-2">
          <p className="font-mono text-xs tracking-wide text-primary">
            My Journey
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            Work <span className="highlight-text">Experience</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={`${exp.title}-${exp.company}`}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="[perspective:1200px]">
                <WindowCard
                  title={`${exp.company.toLowerCase().replace(/\s+/g, "-")}.md`}
                  className="
                    transition-transform duration-200
                    motion-reduce:transform-none
                    hover:-translate-y-1 hover:shadow-xl
                    active:translate-y-0.5
                  "
                >
                  <div className="space-y-4 sm:space-y-5">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-display font-bold flex items-center gap-2">
                          {exp.title}
                          <ArrowUpRight className="w-4 h-4 text-primary shrink-0" />
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {exp.company}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3 text-xs font-mono text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Type */}
                    <span className="inline-block w-fit px-3 py-1 rounded-full bg-accent/50 text-accent-foreground text-[11px] font-mono border border-foreground/10">
                      {exp.type}
                    </span>

                    {/* Highlights */}
                    <ul className="space-y-2 pt-1">
                      {exp.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </WindowCard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
