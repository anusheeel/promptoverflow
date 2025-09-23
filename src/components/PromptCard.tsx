import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PromptCardProps {
  title: string;
  description: string;
  category: string;
  tags: string[];
  prompt: string;
}

export const PromptCard = ({ title, description, category, tags, prompt }: PromptCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <article className="group bg-gradient-card rounded-xl border border-border p-6 shadow-soft hover:shadow-medium transition-all duration-200 hover:-translate-y-1">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <Badge variant="secondary" className="mb-2 font-medium">
              {category}
            </Badge>
            <h3 className="font-semibold text-lg text-foreground leading-tight">
              {title}
            </h3>
          </div>
          <Button
            onClick={handleCopy}
            size="sm"
            variant={copied ? "default" : "outline"}
            className={cn(
              "shrink-0 transition-all duration-200",
              copied ? "bg-accent text-accent-foreground" : "hover:bg-primary hover:text-primary-foreground"
            )}
            aria-label={copied ? "Copied!" : "Copy prompt"}
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-1" />
                Copy
              </>
            )}
          </Button>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
          {description}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Prompt Preview */}
        <div className="bg-muted rounded-lg p-3 border">
          <p className="text-sm text-muted-foreground font-mono leading-relaxed whitespace-pre-wrap break-words">
            {prompt}
          </p>
        </div>
      </div>
    </article>
  );
};
