import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Send,
  Linkedin,
  Github,
} from "lucide-react";
import { WindowCard } from "./WindowCard";

export const ContactSection: React.FC = () => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    if (!formRef.current) return;

    try {
      await emailjs.sendForm(
        "altruisticxai_1994", // SERVICE ID
        "portfolio_form11",   // TEMPLATE ID
        formRef.current,
        "ef4gt_YB35_O5nFin"   // PUBLIC KEY
      );

      setSuccess(true);
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto md:px-8 px-[22px]">
        <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
          <p className="font-mono text-sm text-primary">Get In Touch</p>
          <h2 className="section-title">
            Let's <span className="highlight-text">Connect</span>
          </h2>
          <p className="text-muted-foreground">
            Interested in AI consulting, compliance solutions, or just want to chat
            about the future of AI governance? I'd love to hear from you.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <WindowCard title="connect.sh" className="shadow-window">
            <div className="space-y-6">
              {/* EMAILJS FORM */}
              <form
                ref={formRef}
                onSubmit={sendEmail}
                className="space-y-4"
              >
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full p-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your Email"
                  className="w-full p-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Your Message"
                  className="w-full p-3 rounded-lg bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                  <Send className="w-4 h-4" />
                </button>

                {success && (
                  <p className="text-sm text-green-500 text-center">
                    Message sent successfully ✔
                  </p>
                )}
              </form>

              {/* CONTACT INFO */}
              <div className="space-y-4 pt-4 border-t border-border">
                <a
                  href="mailto:ingakaltak7@gmail.com"
                  className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-accent transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-mono text-sm font-medium">Email</p>
                      <p className="text-muted-foreground text-sm">
                        ingakaltak7@gmail.com
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>

                <a
                  href="tel:2157915906"
                  className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-accent transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-mono text-sm font-medium">Phone</p>
                      <p className="text-muted-foreground text-sm">
                        215-791-5906
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>

                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-mono text-sm font-medium">Location</p>
                      <p className="text-muted-foreground text-sm">
                        Philadelphia, Pennsylvania
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </WindowCard>
        </div>
      </div>
    </section>
  );
};
