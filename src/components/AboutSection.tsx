import { Shield, Brain, FileCode, Users } from "lucide-react";
import heroImage from "@/assets/hero-portrait.jpg";
const highlights = [{
  icon: Brain,
  title: "AI Innovation",
  description: "Building intelligent automation with GPT-4, Claude, and open-source LLMs"
}, {
  icon: Shield,
  title: "Security Expert",
  description: "47+ vulnerabilities discovered through penetration testing"
}, {
  icon: FileCode,
  title: "Policy Engineer",
  description: "Converting regulatory frameworks into deployable controls"
}, {
  icon: Users,
  title: "Federal Consultant",
  description: "3+ years optimizing operations for DoD and federal agencies"
}];
export const AboutSection = () => {
  return <section id="about" className="py-20 bg-fuchsia-50 md:py-[28px]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative animate-fade-up">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border-2 border-foreground/10 shadow-card">
              <img src={heroImage} alt="Inga Kaltak - AI Consultant" className="w-full h-full object-fill" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-accent/30 rounded-full blur-2xl" />
          </div>

          {/* Content Side */}
          <div className="space-y-8 animate-fade-up stagger-2">
            <div className="space-y-4">
              <p className="font-mono text-sm text-primary">About Me</p>
              <h2 className="section-title">
                Bridging <span className="highlight-text">AI & Policy</span>
              </h2>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm an Applied AI Consultant and Engineer based in Philadelphia, specializing 
                in the intersection of artificial intelligence, cybersecurity, and regulatory compliance.
              </p>
              <p>
                With experience spanning federal consulting at Accenture, penetration testing 
                for the Defense Intelligence Agency, and independent AI policy engineering, 
                I bring a unique perspective to complex technical challenges.
              </p>
              <p>
                My work focuses on transforming complex regulatory frameworks—like FERPA, 
                Title IX, and NIST AI RMF—into practical, deployable solutions that organizations 
                can actually implement.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {highlights.map((item, index) => <div key={item.title} className="p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors">
                  <item.icon className="w-6 h-6 text-primary mb-2" />
                  <h4 className="font-display font-bold text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};