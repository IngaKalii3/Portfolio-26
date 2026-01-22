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
      
      <div className="p-4 md:p-6 bg-primary-foreground py-[18px] px-[18px]">{children}</div>
    </div>;
};