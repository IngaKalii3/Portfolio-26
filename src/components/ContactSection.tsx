import { Mail, Phone, MapPin, ArrowUpRight, Linkedin, Github } from "lucide-react";
import { WindowCard } from "./WindowCard";
export const ContactSection = () => {
  return <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto md:px-8 px-[22px]">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
          <p className="font-mono text-sm text-primary">Get In Touch</p>
          <h2 className="section-title">
            Let's <span className="highlight-text">Connect</span>
          </h2>
          <p className="text-muted-foreground">
            Interested in AI consulting, compliance solutions, or just want to chat about 
            the future of AI governance? I'd love to hear from you.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <WindowCard title="connect.sh" className="shadow-window">
            <div className="space-y-6">
              <div className="space-y-4">
                <a href="mailto:ingakaltak7@gmail.com" className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-accent transition-colors group">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-mono text-sm font-medium">Email</p>
                      <p className="text-muted-foreground text-sm">ingakaltak7@gmail.com</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>

                <a href="tel:215-791-5906" className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-accent transition-colors group">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-mono text-sm font-medium">Phone</p>
                      <p className="text-muted-foreground text-sm">215-791-5906</p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>

                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-mono text-sm font-medium">Location</p>
                      <p className="text-muted-foreground text-sm">Philadelphia, Pennsylvania</p>
                    </div>
                  </div>
                </div>
              </div>

              
            </div>
          </WindowCard>
        </div>
      </div>
    </section>;
};