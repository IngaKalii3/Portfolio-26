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
      "Designed and deployed FERPA and Title IX compliance dashboards for public school districts, automating audit readiness and policy tracking",
      "Founded and scaled an AI consultancy delivering rapid automation prototypes for small and mid-sized organizations",
      "Led three proof-of-concept initiatives translating regulatory and policy frameworks into enforceable technical controls",
      "Built GPT-5 and Claude-based tools to extract, normalize, and structure regulatory requirements from unstructured documents",
      "Conducted five NIST AI Risk Management Framework (RMF) feasibility assessments, producing risk registers and mitigation roadmaps",
      "Integrated open-source LLMs (LLaMA, Mistral), reducing infrastructure and inference costs by approximately 40%",
    ],
  },
  {
    title: "Penetration Tester",
    company: "Defense Intelligence Agency & Lockheed Martin",
    type: "Contract",
    period: "Nov 2024 – May 2025",
    location: "Washington, DC (Remote)",
    highlights: [
      "Executed more than 12 authorized penetration tests using Metasploit, Burp Suite, and Nmap",
      "Identified 47 critical and high-severity vulnerabilities with 48-hour remediation SLAs",
      "Reduced reported security incidents by 30% through proactive OSINT reconnaissance and threat modeling",
      "Briefed senior government and contractor stakeholders with prioritized risk findings and remediation strategies",
    ],
  },
  {
    title: "Management Consulting Analyst",
    company: "Accenture Federal Services",
    type: "Full-time",
    period: "Jul 2021 – Oct 2024",
    location: "Washington, DC",
    highlights: [
      "Optimized Department of Defense capital project portfolios, improving resource utilization by approximately 30%",
      "Developed compliance and governance frameworks supporting Defense Logistics Agency modernization initiatives",
      "Led UX/UI design and content strategy for a Department of Energy public-facing website",
      "Delivered quantitative analyses contributing to a 15% reduction in operational costs",
    ],
  },
  {
    title: "Business Analyst",
    company: "SAS / SAP SuccessFactors",
    type: "Full-time",
    period: "Dec 2019 – Mar 2021",
    location: "Newtown Square, PA",
    highlights: [
      "Produced ROI and cost-benefit analyses to inform executive budgeting and investment decisions",
      "Improved operational efficiency by 25% through process analysis and data-driven recommendations",
      "Streamlined reporting workflows, reducing data retrieval time by approximately 30%",
    ],
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <p className="font-mono text-sm text-primary">My Journey</p>
          <h2 className="section-title">
            Work <span className="highlight-text">Experience</span>
          </h2>
        </div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={`${exp.title}-${exp.company}`}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <WindowCard
                title={`${exp.company.toLowerCase().replace(/\s+/g, "-")}.md`}
              >
                <div className="space-y-4">
                  {/* Top Row */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                    <div>
                      <h3 className="flex items-center gap-2 text-xl font-display font-bold">
                        {exp.title}
                        <ArrowUpRight className="h-4 w-4 text-primary" />
                      </h3>
                      <p className="text-muted-foreground">{exp.company}</p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs font-mono text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Employment Type */}
                  <span className="inline-block rounded-full bg-accent/50 px-3 py-1 text-xs font-mono text-accent-foreground">
                    {exp.type}
                  </span>

                  {/* Highlights */}
                  <ul className="space-y-2 pt-2">
                    {exp.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-xs text-muted-foreground"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </WindowCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
