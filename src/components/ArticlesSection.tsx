import { ArrowUpRight, FileText, BookOpen } from "lucide-react";
import { WindowCard } from "./WindowCard";

const articles = [
  {
    title: "Using LLMs for Regulatory Compliance",
    description: "Techniques to extract, structure, and validate policy requirements using LLMs.",
    tags: ["AI", "NLP", "Policy"],
    href: "#",
    icon: FileText,
  },
  {
    title: "Cost-Effective Open-Source LLM Deployment",
    description: "Lessons learned deploying Llama and Mistral in production to reduce inference costs.",
    tags: ["MLOps", "LLMs", "Infrastructure"],
    href: "#",
    icon: BookOpen,
  },
];

export const ArticlesSection = () => {
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
              key={article.title}
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

                  <a
                    href={article.href}
                    className="inline-flex items-center gap-2 mt-4 text-primary font-mono text-sm"
                  >
                    Read article <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </WindowCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;