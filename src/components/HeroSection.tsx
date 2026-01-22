import { ArrowDown, Mail, Phone, MapPin } from "lucide-react";
import { WindowCard } from "./WindowCard";
export const HeroSection = () => {
  return <section className="min-h-screen flex items-center pt-16 pb-20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-accent/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-40 left-10 w-40 h-40 bg-secondary/40 rounded-full blur-3xl animate-float" style={{
      animationDelay: "2s"
    }} />
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-up">
            <div className="space-y-2">
              <p className="font-mono text-sm text-primary">Hello, I'm</p>
              <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight">
                Inga <br />
                <span className="highlight-text">Kaltak</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light mt-4">
                Applied AI Consultant & Engineer
              </p>
            </div>

            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Building intelligent systems at the intersection of AI, security, and policy. 
              Transforming complex regulatory frameworks into deployable solutions.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono text-sm rounded-lg hover:bg-primary/90 transition-colors shadow-card">
                Get in Touch
                <ArrowDown className="w-4 h-4 rotate-[-45deg]" />
              </a>
              <a href="#experience" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-foreground/20 font-mono text-sm rounded-lg hover:bg-muted transition-colors">
                View Experience
              </a>
            </div>
          </div>

          {/* Right Content - Contact Card */}
          <div className="animate-fade-up stagger-2">
            <WindowCard title="contact.json" className="max-w-md mx-auto lg:ml-auto shadow-window">
              <div className="space-y-6">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/40 rounded-full mx-auto flex items-center justify-center">
                  <span className="font-display text-3xl font-bold">IK</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-primary" />
                    <a href="mailto:ingakaltak7@gmail.com" className="font-mono hover:text-primary transition-colors">
                      ingakaltak7@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <span className="font-mono">215-791-5906</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="font-mono">Philadelphia, PA</span>
                  </div>
                </div>

                <div className="flex-wrap pt-2 flex items-start justify-center gap-[4px]">
                  {["AI Policy", "Cybersecurity", "Consulting"].map(tag => <span key={tag} className="py-1 bg-secondary text-secondary-foreground text-xs font-mono rounded-full px-[10px] text-center">
                      {tag}
                    </span>)}
                </div>
              </div>
            </WindowCard>
          </div>
        </div>
      </div>
    </section>;
};