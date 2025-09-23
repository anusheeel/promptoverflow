import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export const CategoryFilter = ({ categories, selectedCategory, onCategorySelect }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant={selectedCategory === null ? "default" : "outline"}
        className={cn(
          "cursor-pointer transition-all duration-200 hover:scale-105",
          selectedCategory === null ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        )}
        onClick={() => onCategorySelect(null)}
      >
        All Categories
      </Badge>
      {categories.map((category) => (
        <Badge
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          className={cn(
            "cursor-pointer transition-all duration-200 hover:scale-105",
            selectedCategory === category ? "bg-primary text-primary-foreground" : "hover:bg-muted"
          )}
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
};