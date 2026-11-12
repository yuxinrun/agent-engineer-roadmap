import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  eyebrow,
  children,
  className,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("py-10 sm:py-14", className)}>
      {eyebrow && (
        <p className="mb-3 text-sm font-medium text-primary">{eyebrow}</p>
      )}
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
