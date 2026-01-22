import React, { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, FileText, BookOpen, X } from "lucide-react";
import { WindowCard } from "./WindowCard";

type Article = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href: string; // markdown file path
  icon: React.ComponentType<{ className?: string }>;
};

const articles: Article[] = [
  {
    id: "using-llms-for-regulatory-compliance",
    title: "Using LLMs for Regulatory Compliance",
    description: "Techniques to extract, structure, and validate policy requirements using LLMs.",
    tags: ["AI", "NLP", "Policy"],
    href: "/articles/using-llms-for-regulatory-compliance.md",
    icon: FileText,
  },
  {
    id: "cost-effective-open-source-llm-deployment",
    title: "Cost-Effective Open-Source LLM Deployment",
    description: "Lessons learned deploying Llama and Mistral in production to reduce inference costs.",
    tags: ["MLOps", "LLMs", "Infrastructure"],
    href: "/articles/cost-effective-open-source-llm-deployment.md",
    icon: BookOpen,
  },
  {
    id: "the-annual-reckoning-ai-predictions-vs-reality",
    title: "The Annual Reckoning: AI Predictions vs. Reality",
    description:
      "A retrospective grading of AI predictions (2023–2025), takeaways about forecasting, and a new set of predictions for 2026–2035.",
    tags: ["AI", "Forecasting", "Analysis"],
    href: "/articles/the-annual-reckoning-ai-predictions-vs-reality.md",
    icon: FileText,
  },
  {
    id: "the-collapse",
    title: "The Collapse",
    description:
      "A short piece following a protagonist working on recursive AI projects and the moral cost of building powerful systems.",
    tags: ["Fiction", "AI", "Culture"],
    href: "/articles/the-collapse.md",
    icon: BookOpen,
  },
];

// small helper: lock scroll when modal open
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

// minimal markdown-to-html-ish renderer (safe + simple)
// (If you already use a Markdown lib, swap this out.)
function renderMarkdownBasic(md: string) {
  // escape html
  const esc = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // headings + paragraphs + line breaks
  const html = esc
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/\n/g, "<br />");

  return `<p>${html}</p>`;
}

function ArticleModal({
  open,
  article,
  markdown,
  loading,
  error,
  onClose,
}: {
  open: boolean;
  article: Article | null;
  markdown: string;
  loading: boolean;
  error: string | null;
  onClose: () => void;
}) {
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !article) return null;

  const Icon = article.icon;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* overlay */}
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />

      {/* panel */}
      <div className="relative w-full max-w-3xl">
        <WindowCard
          title={`${article.id}.md`}
          className="rounded-2xl overflow-hidden border border-foreground/10 bg-background/80 backdrop-blur shadow-window"
        >
          <div className="p-5 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-bold text-xl sm:text-2xl truncate">{article.title}</h3>
                </div>
                <p className="text-muted-foreground mt-2">{article.description}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {article.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs bg-muted/60 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg border border-foreground/15 bg-background/40 hover:bg-muted/60 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-6 max-h-[65vh] overflow-auto pr-1">
              {loading && <p className="text-muted-foreground font-mono text-sm">Loading…</p>}
              {error && <p className="text-red-500 font-mono text-sm">{error}</p>}

              {!loading && !error && (
                <div
                  className="prose prose-neutral dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: renderMarkdownBasic(markdown) }}
                />
              )}
            </div>
          </div>
        </WindowCard>
      </div>
    </div>
  );
}

export const ArticlesSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeArticle = useMemo(
    () => articles.find((a) => a.id === activeId) ?? null,
    [activeId]
  );

  // fetch markdown when opening
  useEffect(() => {
    if (!activeArticle) return;

    setLoading(true);
    setError(null);
    setMarkdown("");

    fetch(activeArticle.href, { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`Could not load article (${r.status})`);
        return r.text();
      })
      .then((txt) => {
        // fix common encoding artifacts if they appear
        const cleaned = txt
          .replaceAll("â€”", "—")
          .replaceAll("â€¦", "…")
          .replaceAll("â€™", "’")
          .replaceAll("â€œ", "“")
          .replaceAll("â€", "”");
        setMarkdown(cleaned);
      })
      .catch((e: any) => setError(e?.message ?? "Failed to load article"))
      .finally(() => setLoading(false));
  }, [activeArticle]);

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
                title={(article.id.slice(0, 40) + ".md").toLowerCase()}
                className="h-full hover:shadow-card transition-shadow duration-300"
              >
                <div className="p-6">
                  <article.icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-display font-bold text-lg">{article.title}</h3>
                  <p className="text-muted-foreground mt-2">{article.description}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.tags.map((tag) => (
                      <span key={tag} className="font-mono text-xs bg-muted/60 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* ✅ Opens modal (no download) */}
                  <button
                    type="button"
                    onClick={() => setActiveId(article.id)}
                    className="inline-flex items-center gap-2 mt-4 text-primary font-mono text-sm hover:underline"
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
        markdown={markdown}
        loading={loading}
        error={error}
        onClose={() => setActiveId(null)}
      />
    </section>
  );
};

export default ArticlesSection;
