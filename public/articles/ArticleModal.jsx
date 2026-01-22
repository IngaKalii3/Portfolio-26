import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'; // optional if you want raw HTML (be careful with XSS)

export default function ArticleModal({ url, open, onClose }) {
  const [md, setMd] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error('Fetch error ' + r.status);
        return r.text();
      })
      .then((text) => { if (!cancelled) setMd(text); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [open, url]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: 'white', maxWidth: 900, maxHeight: '80vh', overflow: 'auto', padding: 20, borderRadius: 8 }}>
        <div style={{ textAlign: 'right' }}>
          <button onClick={onClose}>Close</button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {md && (
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{md}</ReactMarkdown>
        )}
      </div>
    </div>
  );
}
