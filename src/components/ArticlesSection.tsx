import React, { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, FileText, BookOpen, X } from "lucide-react";
import { WindowCard } from "./WindowCard";

type Article = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
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

/**
 * Better (still lightweight) markdown -> HTML rendering.
 * Safe: escapes HTML first.
 * Supports: headings, paragraphs, lists, code blocks, inline code, blockquotes, hr.
 */
function renderMarkdownPretty(md: string) {
  const esc = md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // code fences ```lang
  let html = esc.replace(/```([\s\S]*?)```/g, (_m, code) => {
    return `<pre><code>${code.trim()}</code></pre>`;
  });

  // horizontal rules
  html = html.replace(/^\s*---\s*$/gm, "<hr />");

  // blockquotes
  html = html.replace(/^&gt;\s?(.*)$/gm, "<blockquote>$1</blockquote>");

  // headings
  html = html
    .replace(/^######\s+(.*)$/gm, "<h6>$1</h6>")
    .replace(/^#####\s+(.*)$/gm, "<h5>$1</h5>")
    .replace(/^####\s+(.*)$/gm, "<h4>$1</h4>")
    .replace(/^###\s+(.*)$/gm, "<h3>$1</h3>")
    .replace(/^##\s+(.*)$/gm, "<h2>$1</h2>")
    .replace(/^#\s+(.*)$/gm, "<h1>$1</h1>");

  // unordered lists
  // convert consecutive "- " lines into a <ul>
  html = html.replace(
    /(?:^|\n)(-\s.+)(\n-\s.+)*/g,
    (block) => {
      const items = block
        .trim()
        .split("\n")
        .map((l) => l.replace(/^-+\s+/, "").trim())
        .filter(Boolean)
        .map((t) => `<li>${t}</li>`)
        .join("");
      return `\n<ul>${items}</ul>`;
    }
  );

  // ordered lists
  html = html.replace(
    /(?:^|\n)(\d+\.\s.+)(\n\d+\.\s.+)*/g,
    (block) => {
      const items = block
        .trim()
        .split("\n")
        .map((l) => l.replace(/^\d+\.\s+/, "").trim())
        .filter(Boolean)
        .map((t) => `<li>${t}</li>`)
        .join("");
      return `\n<ol>${items}</ol>`;
    }
  );

  // inline code `code`
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // paragraphs (split by 2+ newlines), but keep existing block tags
  const blocks = html
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean)
    .map((b) => {
      const isBlock =
        /^<(h\d|ul|ol|pre|blockquote|hr)\b/i.test(b) || /<\/(ul|ol|pre|blockquote|h\d)>$/i.test(b);
      return isBlock ? b : `<p>${b.replace(/\n/g, "<br />")}</p>`;
    });

  return blocks.join("\n");
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
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label={article.title}>
      {/* Overlay */}
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />

      {/* Mobile-first sheet + desktop modal */}
      <div className="absolute inset-x-0 bottom-0 top-10 sm:inset-0 sm:flex sm:items-center sm:justify-center sm:p-6">
        <div className="relative w-full sm:max-w-3xl sm:rounded-2xl overflow-hidden">
          <WindowCard
            title={`${article.id}.md`}
            className="h-full bg-background/90 backdrop-blur border border-foreground/10 shadow-window sm:rounded-2xl overflow-hidden"
          >
            {/* Sticky header */}
            <div className="sticky top-0 z-10 border-b border-foreground/10 bg-background/80 backdrop-blur">
              <div className="px-4 sm:px-6 py-4 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-primary shrink-0" />
                    <h3 className="font-display font-bold text-lg sm:text-2xl leading-tight">
                      {article.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground mt-1 text-sm sm:text-base">
                    {article.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[11px] sm:text-xs bg-muted/60 px-2 py-1 rounded-full border border-foreground/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-xl border border-foreground/15 bg-background/40 hover:bg-muted/60 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 sm:px-6 pb-8">
              <div className="pt-5 sm:pt-6 max-h-[calc(100vh-10rem)] sm:max-h-[78vh] overflow-auto pr-1">
                {loading && (
                  <p className="text-muted-foreground font-mono text-sm">
                    Loading…
                  </p>
                )}
                {error && (
                  <p className="text-red-500 font-mono text-sm">
                    {error}
                  </p>
                )}

                {!loading && !error && (
                  <div className="mx-auto max-w-[68ch]">
                    <div
                      className={[
                        // Better readability on mobile
                        "text-[15px] sm:text-[16px] md:text-[17px] leading-[1.85] text-foreground/90",
                        // nicer headings
                        "[&_h1]:text-2xl sm:[&_h1]:text-3xl [&_h1]:font-display [&_h1]:font-bold [&_h1]:mt-2 [&_h1]:mb-4",
                        "[&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-display [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-3",
                        "[&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-display [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2",
                        "[&_p]:my-4",
                        "[&_ul]:my-4 [&_ul]:pl-6 [&_ul]:list-disc",
                        "[&_ol]:my-4 [&_ol]:pl-6 [&_ol]:list-decimal",
                        "[&_li]:my-1",
                        "[&_hr]:my-8 [&_hr]:border-foreground/10",
                        "[&_blockquote]:my-5 [&_blockquote]:border-l-2 [&_blockquote]:border-primary/40 [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground",
                        // code
                        "[&_code]:font-mono [&_code]:text-[0.92em] [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-muted/50",
                        "[&_pre]:my-5 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:bg-muted/50 [&_pre]:border [&_pre]:border-foreground/10 [&_pre]:overflow-auto",
                        "[&_pre_code]:bg-transparent [&_pre_code]:p-0",
                      ].join(" ")}
                      dangerouslySetInnerHTML={{ __html: renderMarkdownPretty(markdown) }}
                    />
                  </div>
                )}
              </div>
            </div>
          </WindowCard>
        </div>
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
