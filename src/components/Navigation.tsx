import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
const navLinks = [{
  label: "About",
  href: "#about"
}, {
  label: "Experience",
  href: "#experience"
}, {
  label: "Projects",
  href: "#projects"
}, {
  label: "Articles",
  href: "#articles"
}, {
  label: "Contact",
  href: "#contact"
}];
export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <nav className="fixed inset-x-0 top-0 z-50">
      <div className={cn("mx-3 mt-3 rounded-2xl bg-background/80 backdrop-blur-md", "border border-border", "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.35)]", "transition-transform duration-200", "active:translate-y-[1px]")}>
        <div className="h-12 border border-fuchsia-600 border-solid px-[10px] flex items-start justify-between bg-white">
          {/* Logo */}
          <a href="#" className="font-display text-lg font-bold tracking-tight">
            IK<span className="text-primary">.</span>
          </a>

          {/* Mobile Menu Button (default) */}
          <button onClick={() => setIsOpen(v => !v)} aria-label="Toggle menu" className={cn("md:hidden", "p-2 rounded-xl", "bg-muted/60", "shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_10px_rgba(0,0,0,0.25)]", "active:translate-y-[1px] active:shadow-none", "transition")}>
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => <a key={link.href} href={link.href} className={cn("group relative", "px-3 py-1.5 text-xs font-mono", "text-muted-foreground hover:text-foreground", "rounded-lg", "transition", "hover:-translate-y-[1px]", "shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]", "hover:shadow-[0_6px_16px_-6px_rgba(0,0,0,0.35)]")}>
                <span className="flex items-center gap-1">
                  {link.label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </a>)}
          </div>
        </div>

        {/* Mobile Nav */}
        <div className={cn("md:hidden overflow-hidden transition-all duration-300", isOpen ? "max-h-72 px-2 pb-3" : "max-h-0")}>
          <div className="flex flex-col gap-1">
            {navLinks.map(link => <a key={`mobile-${link.href}`} href={link.href} onClick={() => setIsOpen(false)} className={cn("px-4 py-2 text-sm font-mono", "rounded-xl", "bg-muted/40", "text-muted-foreground hover:text-foreground", "transition", "shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_14px_-6px_rgba(0,0,0,0.3)]", "active:translate-y-[1px] active:shadow-none")}>
                {link.label}
              </a>)}
          </div>
        </div>
      </div>
    </nav>;
};