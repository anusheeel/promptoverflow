import { SearchX } from "lucide-react";

interface EmptyStateProps {
  searchQuery?: string;
  selectedCategory?: string | null;
}

export const EmptyState = ({ searchQuery, selectedCategory }: EmptyStateProps) => {
  const hasFilters = searchQuery || selectedCategory;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-6 p-4 rounded-full bg-muted">
        <SearchX className="h-12 w-12 text-muted-foreground" />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {hasFilters ? "No prompts found" : "No prompts available"}
      </h3>
      
      <p className="text-muted-foreground max-w-md">
        {hasFilters
          ? "Try adjusting your search terms or category filters to find what you're looking for."
          : "There are no prompts in the collection yet. Check back soon for new additions!"}
      </p>
    </div>
  );
};