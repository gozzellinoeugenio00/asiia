-- Drop the existing role check constraint and create a new one that allows the 'user' role
ALTER TABLE public.profiles 
DROP CONSTRAINT IF EXISTS profiles_role_check;

ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_role_check 
CHECK (
  role = ANY (ARRAY['professional'::text, 'company'::text, 'admin'::text, 'user'::text])
);
