import { useState, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { PromptCard } from "@/components/PromptCard";
import { EmptyState } from "@/components/EmptyState";
import { usePrompts, getUniqueCategories, filterPrompts } from "@/hooks/usePrompts";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { prompts, loading, error } = usePrompts();

  const categories = useMemo(() => getUniqueCategories(prompts), [prompts]);
  const filteredPrompts = useMemo(
    () => filterPrompts(prompts, searchQuery, selectedCategory),
    [prompts, searchQuery, selectedCategory]
  );

  // 🔥 Suggestions for search autocomplete
  const suggestions = useMemo(() => {
    const titles = prompts.map((p) => p.title);
    const tags = prompts.flatMap((p) => p.tags || []);
    return Array.from(new Set([...titles, ...tags, ...categories]));
  }, [prompts, categories]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading prompts...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Error loading prompts
          </h2>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          {/* Top row: Logo + Sub tagline */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <img
                src="/pof_logo.png"
                alt="Prompt Overflow Logo"
                width={80}
                height={80}
                className="rounded-md"
              />
              <p className="text-muted-foreground text-lg">
                Do you even prompt bro !
              </p>
            </div>
            <div></div> {/* Placeholder for future nav */}
          </div>

          {/* Hero tagline (centered below) */}
          <div className="flex justify-center">
            <h1 className="text-foreground text-3xl md:text-4xl font-bold text-center max-w-2xl">
              Learn, grow and create one prompt at a time
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="space-y-6 mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search prompts by title, description, or tags..."
            suggestions={suggestions}
          />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {filteredPrompts.length === 1
              ? "1 prompt found"
              : `${filteredPrompts.length} prompts found`}
          </p>
        </div>

        {/* Prompts Grid */}
        {filteredPrompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredPrompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                title={prompt.title}
                description={prompt.description}
                category={prompt.category}
                tags={prompt.tags}
                prompt={prompt.prompt}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
          />
        )}
      </main>
    </div>
  );
};

export default Index;
