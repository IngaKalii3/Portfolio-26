import { Briefcase, Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { WindowCard } from "./WindowCard";
const experiences = [{
  title: "AI Policy Engineer",
  company: "Independent Consultant",
  type: "Self-employed",
  period: "Oct 2023 - Present",
  location: "Philadelphia, PA",
  highlights: ["Built FERPA/Title IX compliance dashboards for school districts, automating policy tracking", "Launched AI consultancy delivering automation prototypes for SMBs", "Led 3 POC studies converting policy frameworks into deployable controls", "Developed GPT-4 and Claude tools to extract and structure regulatory requirements", "Conducted 5 NIST AI RMF feasibility assessments with risk registers", "Integrated open-source LLMs (Llama, Mistral), cutting infra costs by 40%"]
}, {
  title: "Penetration Tester",
  company: "Defense Intelligence Agency & Lockheed Martin",
  type: "Contract",
  period: "Nov 2024 - May 2025",
  location: "Washington, DC (Remote)",
  highlights: ["Executed 12+ authorized penetration tests using Metasploit, Burp Suite, and Nmap", "Discovered 47 critical vulnerabilities with 48-hour SLA remediation roadmaps", "Reduced security incidents by 30% through proactive OSINT reconnaissance", "Briefed senior stakeholders with risk-prioritized action plans"]
}, {
  title: "Management Consulting Analyst",
  company: "Accenture Federal Services",
  type: "Full-time",
  period: "Jul 2021 - Oct 2024",
  location: "Washington, DC",
  highlights: ["Optimized DoD capital project portfolios achieving 30% improvement in resource utilization", "Developed compliance frameworks for Defense Logistics Agency", "Designed UX/UI and content strategy for Department of Energy website", "Achieved 15% reduction in operational costs through in-depth analysis"]
}, {
  title: "Business Analyst",
  company: "SAS, SAP SuccessFactors",
  type: "Full-time",
  period: "Dec 2019 - Mar 2021",
  location: "Newtown Square, PA",
  highlights: ["Created comprehensive ROI reports guiding budget allocations", "Improved operational efficiency by 25% through data analysis", "Achieved 30% reduction in data retrieval time through process streamlining"]
}];
export const ExperienceSection = () => {
  return <section id="experience" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="space-y-4 mb-12">
          <p className="font-mono text-sm text-primary">My Journey</p>
          <h2 className="section-title">
            Work <span className="highlight-text">Experience</span>
          </h2>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => <div key={exp.title + exp.company} className="animate-fade-up" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <WindowCard title={`${exp.company.toLowerCase().replace(/\s+/g, "-")}.md`}>
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-display font-bold flex items-center gap-2">
                        {exp.title}
                        <ArrowUpRight className="w-4 h-4 text-primary" />
                      </h3>
                      <p className="text-muted-foreground">{exp.company}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <span className="inline-block px-3 py-1 bg-accent/50 text-accent-foreground text-xs font-mono rounded-full">
                    {exp.type}
                  </span>

                  <ul className="space-y-2 pt-2">
                    {exp.highlights.map((highlight, i) => <li key={i} className="flex items-start gap-3 text-muted-foreground text-xs">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                        {highlight}
                      </li>)}
                  </ul>
                </div>
              </WindowCard>
            </div>)}
        </div>
      </div>
    </section>;
};