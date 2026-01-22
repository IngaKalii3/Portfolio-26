import React, { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, FileText, BookOpen, X } from "lucide-react";
import { WindowCard } from "./WindowCard";

type Article = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: React.ComponentType<{ className?: string }>;
  // Put the article content here (or load it later)
  content: React.ReactNode;
};

const articles: Article[] = [
  {
    id: "reg-compliance",
    title: "Using LLMs for Regulatory Compliance",
    description: "Techniques to extract, structure, and validate policy requirements using LLMs.",
    tags: ["AI", "NLP", "Policy"],
    icon: FileText,
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          This is where your full article goes. You can write it as JSX, markdown-rendered content,
          or even import from a CMS later.
        </p>
        <h4 className="font-display font-bold text-base">Key ideas</h4>
        <ul className="list-disc pl-5 text-muted-foreground space-y-1">
          <li>Extract requirements into structured fields</li>
          <li>Validate against sources + citations</li>
          <li>Build auditable traces for reviewers</li>
        </ul>
      </div>
    ),
  },
  {
    id: "oss-llm-deploy",
    title: "Cost-Effective Open-Source LLM Deployment",
    description: "Lessons learned deploying Llama and Mistral in production to reduce inference costs.",
    tags: ["MLOps", "LLMs", "Infrastructure"],
    icon: BookOpen,
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Add your article here (benchmarks, deployment patterns, caching, batching, quantization, etc.).
        </p>
        <h4 className="font-display font-bold text-base">What worked</h4>
        <ul className="list-disc pl-5 text-muted-foreground space-y-1">
          <li>Quantization (4-bit/8-bit) + batching</li>
          <li>Prompt caching and response reuse</li>
          <li>Routing: small model first, large model when needed</li>
        </ul>
      </div>
    ),
  },
];

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

function ArticleModal({
  open,
  article,
  onClose,
}: {
  open: boolean;
  article: Article | null;
  onClose: () => void;
}) {
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open || !article) return null;

  const Icon = article.icon;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
    >
      {/* overlay */}
      <button
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
        onClick={onClose}
        aria-label="Close modal"
        type="button"
      />

      {/* modal panel */}
      <div className="relative w-full max-w-3xl">
        <WindowCard
          title={`${article.title.toLowerCase().replace(/\s+/g, "-")}.md`}
          className="shadow-window rounded-2xl overflow-hidden border border-foreground/10 bg-background/80 backdrop-blur"
        >
          <div className="p-5 sm:p-7">
            {/* header */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-bold text-xl sm:text-2xl truncate">
                    {article.title}
                  </h3>
                </div>
                <p className="text-muted-foreground mt-2">{article.description}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs bg-muted/60 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={onClose}
                className="shrink-0 inline-flex items-center justify-center rounded-lg border border-foreground/15 bg-background/40 hover:bg-muted/60 transition-colors w-10 h-10"
                type="button"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* content */}
            <div className="mt-6 max-h-[65vh] overflow-auto pr-1">
              {article.content}
            </div>
          </div>
        </WindowCard>
      </div>
    </div>
  );
}

export const ArticlesSection = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeArticle = useMemo(
    () => articles.find((a) => a.id === activeId) ?? null,
    [activeId]
  );

  return (
    <section id="articles" className="py-20 md:py-32 bg-muted/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="space-y-4 mb-12">
          <p className="font-mono text-sm text-primary">Insights & Writing</p>
          <h2 className="section-title">
            Selected <span className="highlight-text">Articles</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <div
              key={article.id}
              className="group animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <WindowCard
                title={article.title.toLowerCase().replace(/\s+/g, "-") + ".md"}
                className="h-full hover:shadow-card transition-shadow duration-300"
              >
                <div className="p-6">
                  <article.icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-display font-bold text-lg">{article.title}</h3>
                  <p className="text-muted-foreground mt-2">{article.description}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs bg-muted/60 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* ✅ Use a button (no downloads, no navigation) */}
                  <button
                    type="button"
                    onClick={() => setActiveId(article.id)}
                    className="inline-flex items-center gap-2 mt-4 text-primary font-mono text-sm hover:opacity-90"
                  >
                    Read article <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </WindowCard>
            </div>
          ))}
        </div>
      </div>

      <ArticleModal
        open={activeId !== null}
        article={activeArticle}
        onClose={() => setActiveId(null)}
      />
    </section>
  );
};

export default ArticlesSection;
