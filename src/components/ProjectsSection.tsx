import { ArrowUpRight, Lock, Bot, BarChart3, Globe } from "lucide-react";
import { WindowCard } from "./WindowCard";

const projects = [
  {
    title: "FERPA/Title IX Compliance Dashboard",
    description: "Automated policy tracking and reporting system for multiple school districts, ensuring regulatory compliance.",
    tags: ["AI", "Compliance", "Dashboard"],
    icon: BarChart3,
  },
  {
    title: "Regulatory LLM Tools",
    description: "GPT-4 and Claude-powered tools to extract, summarize, and structure regulatory requirements from complex documents.",
    tags: ["GPT-4", "Claude", "NLP"],
    icon: Bot,
  },
  {
    title: "Blockchain Identity Verification",
    description: "Secure digital governance prototype using blockchain technology for identity verification.",
    tags: ["Blockchain", "Security", "Identity"],
    icon: Lock,
  },
  {
    title: "Department of Energy UX Redesign",
    description: "User-centric interface design and content strategy for energy.gov, significantly increasing engagement.",
    tags: ["UX/UI", "Content Strategy", "Federal"],
    icon: Globe,
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="space-y-4 mb-12">
          <p className="font-mono text-sm text-primary">Featured Work</p>
          <h2 className="section-title">
            Key <span className="highlight-text">Projects</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <WindowCard
                title={project.title.toLowerCase().replace(/\s+/g, "-") + ".tsx"}
                className="h-full hover:shadow-card transition-shadow duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <project.icon className="w-6 h-6 text-primary" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-mono rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </WindowCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
