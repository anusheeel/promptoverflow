import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Prompt = Database['public']['Tables']['prompts']['Row'];

export const usePrompts = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('prompts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPrompts(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch prompts');
      } finally {
        setLoading(false);
      }
    };

    fetchPrompts();
  }, []);

  return { prompts, loading, error };
};

export const getUniqueCategories = (prompts: Prompt[]): string[] => {
  const categories = prompts.map(prompt => prompt.category);
  return [...new Set(categories)].sort();
};

export const filterPrompts = (
  prompts: Prompt[],
  searchQuery: string,
  selectedCategory: string | null
): Prompt[] => {
  return prompts.filter(prompt => {
    const matchesSearch = !searchQuery || 
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = !selectedCategory || prompt.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
};