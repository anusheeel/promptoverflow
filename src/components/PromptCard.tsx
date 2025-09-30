import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
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

export const PromptCard = ({
  title,
  description,
  category,
  tags,
  prompt,
}: PromptCardProps) => {
  const [copied, setCopied] = useState(false);
  const [expandedText, setExpandedText] = useState(false);
  const [expandedInputs, setExpandedInputs] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});

  // 🔹 Find all <input>...</input> placeholders
  const inputFields = Array.from(
    prompt.matchAll(/<input>(.*?)<\/input>/gi),
    (m) => m[1]
  );

  // 🔹 Deduplicate input fields
  const uniqueFields = Array.from(new Set(inputFields));

  // 🔹 Cleanup label for display
  const cleanLabel = (raw: string) =>
    raw
      .replace(/\[|\]/g, "")
      .replace(/insert|paste/gi, "")
      .trim()
      .replace(/\b\w/g, (c) => c.toUpperCase());

  // 🔹 Replace placeholders with user inputs
  const buildFinalPrompt = () => {
    let finalPrompt = prompt;
    uniqueFields.forEach((field) => {
      const value = values[field] || `[${field}]`;
      finalPrompt = finalPrompt.replaceAll(`<input>${field}</input>`, value);
    });
    return finalPrompt;
  };

  const handleCopy = async (customPrompt?: string) => {
    try {
      await navigator.clipboard.writeText(customPrompt || buildFinalPrompt());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <article className="group bg-gradient-card rounded-xl border border-border p-6 shadow-soft hover:shadow-medium transition-all duration-200 hover:-translate-y-1 h-full flex flex-col">
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
            onClick={() => handleCopy()}
            size="sm"
            variant={copied ? "default" : "outline"}
            className={cn(
              "shrink-0 transition-all duration-200",
              copied
                ? "bg-accent text-accent-foreground"
                : "hover:bg-primary hover:text-primary-foreground"
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
        <div className="bg-muted rounded-lg p-3 border mt-auto relative">
          <p
            className={cn(
              "text-sm text-muted-foreground font-mono leading-relaxed whitespace-pre-wrap break-words transition-all",
              expandedText ? "line-clamp-none" : "line-clamp-5"
            )}
          >
            {prompt}
          </p>

          {/* Expand/Collapse button for text */}
          {prompt.length > 200 && (
            <div className="flex justify-end mt-2">
              <Button
                onClick={() => setExpandedText(!expandedText)}
                size="sm"
                variant="ghost"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                {expandedText ? (
                  <>
                    Show Less <ChevronUp className="h-3 w-3" />
                  </>
                ) : (
                  <>
                    Show More <ChevronDown className="h-3 w-3" />
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* 🔹 Input Fields */}
        {uniqueFields.length > 0 && (
          <div className="mt-4 space-y-3">
            {(expandedInputs ? uniqueFields : uniqueFields.slice(0, 2)).map(
              (field, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    {cleanLabel(field)}
                  </label>
                  <input
                    type="text"
                    placeholder={`Enter ${cleanLabel(field)}`}
                    value={values[field] || ""}
                    onChange={(e) =>
                      setValues({ ...values, [field]: e.target.value })
                    }
                    className="w-full p-2 text-sm text-foreground bg-card rounded-md border border-border shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              )
            )}

            {/* Expand/Collapse button for inputs */}
            {uniqueFields.length > 2 && (
              <div className="flex justify-end">
                <Button
                  onClick={() => setExpandedInputs(!expandedInputs)}
                  size="sm"
                  variant="ghost"
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  {expandedInputs ? (
                    <>
                      Show Less Inputs <ChevronUp className="h-3 w-3" />
                    </>
                  ) : (
                    <>
                      Show More Inputs <ChevronDown className="h-3 w-3" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
};
