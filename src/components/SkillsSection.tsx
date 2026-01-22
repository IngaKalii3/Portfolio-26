import { WindowCard } from "./WindowCard";
const skillCategories = [{
  title: "AI & Machine Learning",
  skills: ["GPT-4", "Claude", "LLaMA", "Mistral", "NLP", "Prompt Engineering", "AI Policy"]
}, {
  title: "Security & Compliance",
  skills: ["Penetration Testing", "NIST AI RMF", "FERPA", "OSINT", "Metasploit", "Burp Suite", "Nmap"]
}, {
  title: "Consulting & Analysis",
  skills: ["Policy Analysis", "Government Procurement", "Change Management", "ROI Reporting", "Data Analysis"]
}, {
  title: "Design & Development",
  skills: ["UX/UI Design", "Content Strategy", "Blockchain", "Process Automation", "Dashboard Development"]
}];
export const SkillsSection = () => {
  return <section id="skills" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">
        <div className="space-y-4 mb-12">
          <p className="font-mono text-sm text-primary">What I Do</p>
          <h2 className="section-title">
            Skills & <span className="highlight-text">Expertise</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => <div key={category.title} className="animate-fade-up" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <WindowCard title={category.title.toLowerCase().replace(/\s+/g, "_") + ".ts"}>
                <div className="space-y-4">
                  <h3 className="font-display text-lg font-bold">{category.title}</h3>
                  <div className="flex-wrap gap-2 flex items-start justify-center">
                    {category.skills.map(skill => <span key={skill} className="py-1.5 bg-background border border-border text-sm font-mono rounded-lg hover:border-primary hover:bg-primary/5 transition-colors cursor-default px-[6px] text-center">
                        {skill}
                      </span>)}
                  </div>
                </div>
              </WindowCard>
            </div>)}
        </div>
      </div>
    </section>;
};