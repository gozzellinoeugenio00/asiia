-- Create projects table for portfolio
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create announcements table for companies
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Projects policies
-- Everyone can read portfolio projects
CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (true);
-- Only the owner can insert, update, delete own projects
CREATE POLICY "Users can insert own projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON public.projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON public.projects FOR DELETE USING (auth.uid() = user_id);

-- Announcements policies
-- Everyone can read announcements
CREATE POLICY "Anyone can view announcements" ON public.announcements FOR SELECT USING (true);
-- Only companies can insert (handled via application logic but ensuring they insert for themselves)
CREATE POLICY "Companies can insert own announcements" ON public.announcements FOR INSERT WITH CHECK (auth.uid() = company_id);
CREATE POLICY "Companies can update own announcements" ON public.announcements FOR UPDATE USING (auth.uid() = company_id);
CREATE POLICY "Companies can delete own announcements" ON public.announcements FOR DELETE USING (auth.uid() = company_id);
