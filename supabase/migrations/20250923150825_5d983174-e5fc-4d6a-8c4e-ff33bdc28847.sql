-- Create prompts table
CREATE TABLE public.prompts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  prompt TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read prompts (public data)
CREATE POLICY "Prompts are viewable by everyone" 
ON public.prompts 
FOR SELECT 
USING (true);

-- Insert mock data
INSERT INTO public.prompts (id, title, description, category, tags, prompt) VALUES
('1', 'Code Review Assistant', 'Get detailed, constructive feedback on your code with suggestions for improvements and best practices.', 'Development', ARRAY['code-review', 'programming', 'best-practices'], 'Please review the following code and provide detailed feedback on:
1. Code quality and readability
2. Performance considerations
3. Security issues
4. Best practices and conventions
5. Suggestions for improvement

[Paste your code here]'),

('2', 'Creative Writing Brainstorm', 'Generate unique story ideas, character concepts, and plot twists for your creative writing projects.', 'Writing', ARRAY['creative-writing', 'storytelling', 'brainstorming'], 'I need help brainstorming for a creative writing project. Please help me develop:
1. Three unique story concepts with different genres
2. Compelling main characters with clear motivations
3. Potential plot twists and conflicts
4. Setting details that enhance the narrative

Topic/theme: [Your theme here]'),

('3', 'Social Media Content Planner', 'Create engaging social media posts with strategic hashtags and optimal posting schedules.', 'Marketing', ARRAY['social-media', 'content-strategy', 'engagement'], 'Create a 7-day social media content plan for [platform] including:
1. Daily post ideas with engaging captions
2. Relevant hashtags for maximum reach
3. Best posting times for target audience
4. Content mix (educational, entertaining, promotional)
5. Call-to-action suggestions

Brand/Business: [Your brand]
Target Audience: [Your audience]'),

('4', 'Product Feature Analyzer', 'Analyze product features and generate compelling descriptions that highlight benefits and use cases.', 'Product', ARRAY['product-management', 'features', 'analysis'], 'Analyze the following product feature and provide:
1. Clear feature description in user-friendly language
2. Key benefits and value propositions
3. Target user personas who would benefit most
4. Use cases and scenarios
5. Potential concerns and how to address them
6. Competitive advantages

Feature: [Describe your feature]'),

('5', 'Learning Path Creator', 'Design comprehensive learning paths with resources, milestones, and practical exercises for any skill.', 'Education', ARRAY['learning', 'education', 'skill-building'], 'Create a comprehensive learning path for [skill/topic] including:
1. Learning objectives and milestones
2. Recommended resources (books, courses, tutorials)
3. Practical exercises and projects
4. Timeline and progression strategy
5. Assessment methods
6. Common challenges and how to overcome them

Skill Level: [Beginner/Intermediate/Advanced]
Time Commitment: [Hours per week]'),

('6', 'Meeting Minutes Generator', 'Transform messy meeting notes into clear, actionable minutes with assigned tasks and deadlines.', 'Business', ARRAY['meetings', 'productivity', 'documentation'], 'Convert these meeting notes into professional meeting minutes:

[Paste your raw notes here]

Please format with:
1. Meeting overview (date, attendees, purpose)
2. Key discussion points
3. Decisions made
4. Action items with assigned owners and deadlines
5. Next steps and follow-up meetings'),

('7', 'Technical Concept Explainer', 'Break down complex technical concepts into simple, understandable explanations with examples.', 'Education', ARRAY['technical-writing', 'explanation', 'simplification'], 'Explain [technical concept] in simple terms:

1. Basic definition without jargon
2. Why it matters and key benefits
3. How it works (step-by-step if applicable)
4. Real-world examples and analogies
5. Common misconceptions
6. Getting started resources

Target audience: [Specify audience level]'),

('8', 'Email Campaign Optimizer', 'Craft compelling email campaigns with attention-grabbing subject lines and strong calls-to-action.', 'Marketing', ARRAY['email-marketing', 'copywriting', 'conversion'], 'Create an email campaign for [campaign goal]:

1. 5 attention-grabbing subject line options
2. Compelling email body with clear value proposition
3. Strong call-to-action placement and copy
4. Personalization suggestions
5. A/B testing recommendations
6. Follow-up sequence ideas

Target Audience: [Describe audience]
Goal: [Specific objective]');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_prompts_updated_at
    BEFORE UPDATE ON public.prompts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();