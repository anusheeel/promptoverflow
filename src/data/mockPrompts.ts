export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  prompt: string;
}

export const mockPrompts: Prompt[] = [
  {
    id: "1",
    title: "Code Review Assistant",
    description: "Get detailed, constructive feedback on your code with suggestions for improvements and best practices.",
    category: "Development",
    tags: ["code-review", "programming", "best-practices"],
    prompt: "Please review the following code and provide detailed feedback on:\n1. Code quality and readability\n2. Performance considerations\n3. Security issues\n4. Best practices and conventions\n5. Suggestions for improvement\n\n[Paste your code here]"
  },
  {
    id: "2",
    title: "Creative Writing Brainstorm",
    description: "Generate unique story ideas, character concepts, and plot twists for your creative writing projects.",
    category: "Writing",
    tags: ["creative-writing", "storytelling", "brainstorming"],
    prompt: "I need help brainstorming for a creative writing project. Please help me develop:\n1. Three unique story concepts with different genres\n2. Compelling main characters with clear motivations\n3. Potential plot twists and conflicts\n4. Setting details that enhance the narrative\n\nTopic/theme: [Your theme here]"
  },
  {
    id: "3",
    title: "Social Media Content Planner",
    description: "Create engaging social media posts with strategic hashtags and optimal posting schedules.",
    category: "Marketing",
    tags: ["social-media", "content-strategy", "engagement"],
    prompt: "Create a 7-day social media content plan for [platform] including:\n1. Daily post ideas with engaging captions\n2. Relevant hashtags for maximum reach\n3. Best posting times for target audience\n4. Content mix (educational, entertaining, promotional)\n5. Call-to-action suggestions\n\nBrand/Business: [Your brand]\nTarget Audience: [Your audience]"
  },
  {
    id: "4",
    title: "Product Feature Analyzer",
    description: "Analyze product features and generate compelling descriptions that highlight benefits and use cases.",
    category: "Product",
    tags: ["product-management", "features", "analysis"],
    prompt: "Analyze the following product feature and provide:\n1. Clear feature description in user-friendly language\n2. Key benefits and value propositions\n3. Target user personas who would benefit most\n4. Use cases and scenarios\n5. Potential concerns and how to address them\n6. Competitive advantages\n\nFeature: [Describe your feature]"
  },
  {
    id: "5",
    title: "Learning Path Creator",
    description: "Design comprehensive learning paths with resources, milestones, and practical exercises for any skill.",
    category: "Education",
    tags: ["learning", "education", "skill-building"],
    prompt: "Create a comprehensive learning path for [skill/topic] including:\n1. Learning objectives and milestones\n2. Recommended resources (books, courses, tutorials)\n3. Practical exercises and projects\n4. Timeline and progression strategy\n5. Assessment methods\n6. Common challenges and how to overcome them\n\nSkill Level: [Beginner/Intermediate/Advanced]\nTime Commitment: [Hours per week]"
  },
  {
    id: "6",
    title: "Meeting Minutes Generator",
    description: "Transform messy meeting notes into clear, actionable minutes with assigned tasks and deadlines.",
    category: "Business",
    tags: ["meetings", "productivity", "documentation"],
    prompt: "Convert these meeting notes into professional meeting minutes:\n\n[Paste your raw notes here]\n\nPlease format with:\n1. Meeting overview (date, attendees, purpose)\n2. Key discussion points\n3. Decisions made\n4. Action items with assigned owners and deadlines\n5. Next steps and follow-up meetings"
  },
  {
    id: "7",
    title: "Technical Concept Explainer",
    description: "Break down complex technical concepts into simple, understandable explanations with examples.",
    category: "Education",
    tags: ["technical-writing", "explanation", "simplification"],
    prompt: "Explain [technical concept] in simple terms:\n\n1. Basic definition without jargon\n2. Why it matters and key benefits\n3. How it works (step-by-step if applicable)\n4. Real-world examples and analogies\n5. Common misconceptions\n6. Getting started resources\n\nTarget audience: [Specify audience level]"
  },
  {
    id: "8",
    title: "Email Campaign Optimizer",
    description: "Craft compelling email campaigns with attention-grabbing subject lines and strong calls-to-action.",
    category: "Marketing",
    tags: ["email-marketing", "copywriting", "conversion"],
    prompt: "Create an email campaign for [campaign goal]:\n\n1. 5 attention-grabbing subject line options\n2. Compelling email body with clear value proposition\n3. Strong call-to-action placement and copy\n4. Personalization suggestions\n5. A/B testing recommendations\n6. Follow-up sequence ideas\n\nTarget Audience: [Describe audience]\nGoal: [Specific objective]"
  }
];

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