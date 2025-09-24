import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  suggestions?: string[];
}

export const SearchBar = ({
  value,
  onChange,
  placeholder = "Search prompts...",
  suggestions = [],
}: SearchBarProps) => {
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement | null>(null);

  // live-filter suggestions
  const filtered = useMemo(() => {
    if (!value) return [];
    const v = value.toLowerCase();
    return suggestions
      .filter((s) => s.toLowerCase().includes(v))
      .slice(0, 8);
  }, [suggestions, value]);

  useEffect(() => {
    setActive(0);
  }, [value]);

  const handleClear = () => onChange("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filtered.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      onChange(filtered[active]);
      setFocused(false);
    } else if (e.key === "Escape") {
      setFocused(false);
    }
  };

  return (
    <div className="relative">
      {/* Icon */}
      <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

      {/* Input */}
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        className="pl-10 pr-10 h-12 text-base bg-background border-border focus:ring-2 focus:ring-primary focus:border-transparent"
        aria-autocomplete="list"
        aria-expanded={focused && filtered.length > 0}
        aria-controls="search-suggestions"
      />

      {/* Clear */}
      {value && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      {/* Suggestions */}
      {focused && filtered.length > 0 && (
        <ul
          id="search-suggestions"
          ref={listRef}
          className="absolute z-50 mt-1 w-full bg-popover border border-border rounded-md shadow-lg max-h-56 overflow-y-auto"
          role="listbox"
        >
          {filtered.map((s, i) => (
            <li
              key={`${s}-${i}`}
              role="option"
              aria-selected={i === active}
              // onMouseDown = choose before input blurs
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(s);
                setFocused(false);
              }}
              className={`px-4 py-2 cursor-pointer ${
                i === active
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
