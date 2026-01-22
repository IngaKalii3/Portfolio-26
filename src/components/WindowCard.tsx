import { cn } from "@/lib/utils";
import { ReactNode } from "react";
interface WindowCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
}
export const WindowCard = ({
  title,
  children,
  className,
  headerClassName
}: WindowCardProps) => {
  return <div className={cn("window-card", className)}>
      <div className={cn("window-header", headerClassName)}>
        <div className="flex gap-1.5">
          <span className="window-dot window-dot-red" />
          <span className="window-dot window-dot-yellow" />
          <span className="window-dot window-dot-green" />
        </div>
        {title && <span className="font-mono text-xs text-muted-foreground ml-2">
            {title}
          </span>}
      </div>
      <div className="p-4 md:p-6 bg-primary-foreground">{children}</div>
    </div>;
};