import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export interface ResearchNote {
  title: string;
  date: string;
  abstract: string;
  tags: string[];
}

export function ResearchEntry({ note }: { note: ResearchNote }) {
  return (
    <Card className="transition-colors hover:border-border-hover">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <span className="font-mono text-xs text-subtle-foreground">{note.date}</span>
        <div className="flex gap-1.5">
          {note.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-heading text-base font-medium text-foreground">
          {note.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">{note.abstract}</p>
      </CardContent>
    </Card>
  );
}
