import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suggestions?: string[]; // 👈 new
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = "Search prompts...",
  suggestions = [],
}: SearchBarProps) => {
  const [focused, setFocused] = useState(false);

  const handleClear = () => {
    onChange("");
  };

  // live-filter suggestions
  const filtered =
    value.length > 0
      ? suggestions
          .filter((s) => s.toLowerCase().includes(value.toLowerCase()))
          .slice(0, 5)
      : [];

  return (
    <div className="relative">
      {/* Search icon */}
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

      {/* Input */}
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)} // small delay for clicks
        className="pl-10 pr-10 h-12 text-base bg-background border-border focus:ring-2 focus:ring-primary focus:border-transparent"
      />

      {/* Clear button */}
      {value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      {/* Suggestions dropdown */}
      {focused && filtered.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-popover border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
          {filtered.map((s) => (
            <li
              key={s}
              onClick={() => onChange(s)}
              className="px-4 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground"
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
