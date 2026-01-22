export const Footer = () => {
  return <footer className="border-t border-border py-[18px]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-lg font-bold">
            Inga K<span className="text-primary">.</span>
          </div>
          <p className="font-mono text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted-foreground text-right">
            Built with passion & purpose
          </p>
        </div>
      </div>
    </footer>;
};