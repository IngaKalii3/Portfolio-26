import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

interface ArticleModalProps {
  url: string;
  title?: string;
  open: boolean;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ url, title, open, onClose }) => {
  const [md, setMd] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    setLoading(true);
    setError(null);
    setMd(null);

    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to fetch article (${r.status})`);
        return r.text();
      })
      .then((text) => {
        if (!cancelled) setMd(text);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || "Fetch error");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open, url]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center p-4 md:p-8 bg-black/60"
      onClick={(e) => {
        // close when clicking backdrop
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={containerRef}
        className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 max-w-4xl w-full max-h-[85vh] overflow-auto rounded-lg shadow-lg p-6"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-bold">{title}</h2>
            <p className="text-sm text-muted-foreground">Article preview</p>
          </div>
          <div>
            <button
              onClick={onClose}
              aria-label="Close article"
              className="text-sm font-mono text-muted-foreground hover:text-primary"
            >
              Close
            </button>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          {loading && <p>Loading article…</p>}
          {error && <p className="text-red-600">Error: {error}</p>}
          {md && (
            <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
              {md}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;
