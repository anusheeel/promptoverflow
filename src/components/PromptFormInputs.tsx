import { useState, useMemo } from "react";

interface PromptFormInputsProps {
  prompt: string;
  onCopy: (finalPrompt: string) => void;
}

export const PromptFormInputs = ({ prompt, onCopy }: PromptFormInputsProps) => {
  // Extract <input>...</input> blocks
  const fields = useMemo(() => {
    const regex = /<input>(.*?)<\/input>/g;
    const matches = [...prompt.matchAll(regex)];
    // Deduplicate by label text
    return Array.from(new Set(matches.map((m) => m[1].trim())));
  }, [prompt]);

  const [values, setValues] = useState<Record<string, string>>({});

  const handleChange = (label: string, value: string) => {
    setValues((prev) => ({ ...prev, [label]: value }));
  };

  const handleCopy = () => {
    let finalPrompt = prompt;
    Object.entries(values).forEach(([label, value]) => {
      const regex = new RegExp(`<input>${label}<\\/input>`, "g");
      finalPrompt = finalPrompt.replace(regex, value || `[${label}]`);
    });
    onCopy(finalPrompt);
  };

  if (fields.length === 0) return null;

  return (
    <div className="mt-3 space-y-2">
      {fields.map((label) => (
        <div key={label} className="flex flex-col">
          <label className="text-xs text-muted-foreground mb-1">
            {label}:
          </label>
          <input
            type="text"
            value={values[label] || ""}
            onChange={(e) => handleChange(label, e.target.value)}
            placeholder={`Enter ${label}`}
            className="px-2 py-1 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      ))}

      <button
        onClick={handleCopy}
        className="w-full mt-2 rounded-md bg-primary text-primary-foreground py-1.5 text-sm font-medium hover:bg-primary/90"
      >
        Copy with Inputs
      </button>
    </div>
  );
};
