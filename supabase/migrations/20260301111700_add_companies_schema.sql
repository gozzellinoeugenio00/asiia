-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    role TEXT
);

-- Create companies table
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    company_name TEXT NOT NULL,
    vat_number TEXT NOT NULL,
    tax_code TEXT NOT NULL,
    industry TEXT NOT NULL,
    company_type TEXT NOT NULL,
    address TEXT NOT NULL,
    address_number TEXT NOT NULL,
    city TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    province TEXT NOT NULL,
    operating_office TEXT,
    pec_email TEXT NOT NULL,
    phone TEXT NOT NULL,
    website TEXT,
    sdi_code TEXT NOT NULL,
    billing_pec TEXT,
    referent_role TEXT NOT NULL,
    mobile_phone TEXT
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Allow companies to view their own details
CREATE POLICY "Companies can view own details" ON public.companies FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Companies can update own details" ON public.companies FOR UPDATE USING (auth.uid() = id);

-- Handle new user insertions with a trigger
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (id, first_name, last_name, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'role'
  );

  -- If role is company, also insert into companies table
  IF new.raw_user_meta_data->>'role' = 'company' THEN
      INSERT INTO public.companies (
          id,
          company_name,
          vat_number,
          tax_code,
          industry,
          company_type,
          address,
          address_number,
          city,
          zip_code,
          province,
          operating_office,
          pec_email,
          phone,
          website,
          sdi_code,
          billing_pec,
          referent_role,
          mobile_phone
      ) VALUES (
          new.id,
          new.raw_user_meta_data->>'company_name',
          new.raw_user_meta_data->>'vat_number',
          new.raw_user_meta_data->>'tax_code',
          new.raw_user_meta_data->>'industry',
          new.raw_user_meta_data->>'company_type',
          new.raw_user_meta_data->>'address',
          new.raw_user_meta_data->>'address_number',
          new.raw_user_meta_data->>'city',
          new.raw_user_meta_data->>'zip_code',
          new.raw_user_meta_data->>'province',
          new.raw_user_meta_data->>'operating_office',
          new.raw_user_meta_data->>'pec_email',
          new.raw_user_meta_data->>'phone',
          new.raw_user_meta_data->>'website',
          new.raw_user_meta_data->>'sdi_code',
          new.raw_user_meta_data->>'billing_pec',
          new.raw_user_meta_data->>'referent_role',
          new.raw_user_meta_data->>'mobile_phone'
      );
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Map the function to a trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
