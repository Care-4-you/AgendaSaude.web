import { cn } from "../lib/utils";

interface WrapperProps {
  className?: string;
  children: React.ReactNode;
}
export default function MaxWidthWrapper({ className, children }: WrapperProps) {
  return (
    <div className={cn("h-full mx-auto w-full max-w-[87.5rem] ", className)}>
      {children}
    </div>
  );
}
