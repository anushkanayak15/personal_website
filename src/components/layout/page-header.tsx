import { SectionLabel } from "@/components/ui/section-label";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-border pb-10">
      <SectionLabel>{eyebrow}</SectionLabel>
      <h1 className="text-balance font-heading text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="max-w-2xl text-balance text-base text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
