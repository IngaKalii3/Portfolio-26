import React, { useState } from 'react';
import ArticleModal from './ArticleModal';

export default function ArticlePage() {
  const [open, setOpen] = useState(false);
  const url = '/articles/cost-effective-open-source-llm-deployment.md'; // served from public

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open article in modal</button>
      <ArticleModal url={url} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
