-- Allow everyone to read company details
DROP POLICY IF EXISTS "Anyone can view companies" ON public.companies;
CREATE POLICY "Anyone can view companies" ON public.companies FOR SELECT USING (true);

-- Update existing companies to be AI providers by default if null
UPDATE public.companies SET is_ai_provider = true WHERE is_ai_provider IS NULL;

-- Update the handle_new_user function to include is_ai_provider
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
          mobile_phone,
          is_ai_provider
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
          new.raw_user_meta_data->>'mobile_phone',
          COALESCE((new.raw_user_meta_data->>'is_ai_provider')::boolean, true)
      );
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
