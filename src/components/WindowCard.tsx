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
        <div className="flex gap-[4px]">
          <span className="window-dot window-dot-red" />
          <span className="window-dot window-dot-yellow" />
          <span className="window-dot window-dot-green" />
        </div>
        {title}
      </div>
      <div className="p-4 md:p-6 bg-primary-foreground px-[20px] py-[20px] border-fuchsia-400 border border-dotted">{children}</div>
    </div>;
};