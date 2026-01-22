# Portfolio-26

Personal portfolio built with Vite + React + Tailwind CSS.

A clean, responsive portfolio to showcase projects, writing, and contact details.

---

## Demo
(If deployed) https://<your-username>.github.io/Portfolio-26/  
Replace with your Netlify/Vercel/GitHub Pages URL.

---

## Tech Stack
- Vite
- React (TypeScript)
- Tailwind CSS
- lucide-react (icons)

---

## Features
- Home / hero section
- Projects grid with links and screenshots
- Articles / writing section (Markdown)
- Responsive layout and dark mode
- Easy-to-edit content (components + markdown files)

---

## Local development

1. Clone
```bash
git clone https://github.com/IngaKalii3/Portfolio-26.git
cd Portfolio-26
```

2. Install
```bash
npm install
# or
pnpm install
# or
yarn
```

3. Run dev server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

5. Preview build
```bash
npm run preview
```

---

## Content & Articles
Articles live as Markdown files under `/src` or `/articles` (adjust path to your setup). Example file names should match the `WindowCard` titles (e.g., `the-annual-reckoning-ai-predictions-vs-reality.md`).

If you want frontmatter (date, author, tags) added to each article for better routing/rendering, I can add that.

---

## Linting & Formatting
Add & run:
- ESLint
- Prettier
- (optional) husky + lint-staged for pre-commit checks

Example:
```bash
npm install -D eslint prettier eslint-config-prettier
```

---

## Deployment
- GitHub Pages: set repo Pages to `main` → `/ (root)` or configure to serve `dist/`
- Vercel / Netlify: connect repo and set build command `npm run build`, publish `dist/`

Add SEO meta tags to `index.html` (title, description, open graph).

---

## Suggestions / Next Steps (I can do these)
- Add meaningful README screenshots/GIFs (I can produce placeholders).
- Add frontmatter to article markdown files (date, author, tags).
- Add ESLint + Prettier configuration and format the repo.
- Wire up deployment (Netlify/Vercel) or add GH Pages config.
- Fix any broken links and confirm article paths (e.g., `/articles/...`).

---

## Contact
- Name: Your Name
- Email: you@example.com
- GitHub: https://github.com/IngaKalii3

---

If you want, I can:
- Commit this README to `main` for you, or
- Create ESLint/Prettier configs and run a first pass, or
- Add frontmatter to the two article files and update the `ArticlesSection` links.

Which would you like me to do next?
