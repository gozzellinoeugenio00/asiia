-- Create a more robust handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
    role_val TEXT;
BEGIN
  -- Extract role and default to 'user' if not provided
  role_val := COALESCE(new.raw_user_meta_data->>'role', 'user');

  -- Insert into profiles for everyone
  -- We use COALESCE and handle potential missing isAdmin column by checking if it exists
  -- Note: If isAdmin doesn't exist in your table yet, this will still work because it's not and NOT NULL constraint usually.
  -- But if it IS NOT NULL and missing, we must provide it.
  
  INSERT INTO public.profiles (id, first_name, last_name, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'first_name', ''),
    COALESCE(new.raw_user_meta_data->>'last_name', ''),
    role_val
  );

  -- If role is professional, insert into professionals table
  IF role_val = 'professional' THEN
      INSERT INTO public.professionals (
          profile_id,
          available,
          role_title,
          company,
          location,
          bio,
          skills
      ) VALUES (
          new.id,
          true,
          new.raw_user_meta_data->>'role_title',
          new.raw_user_meta_data->>'company',
          new.raw_user_meta_data->>'location',
          new.raw_user_meta_data->>'bio',
          CASE 
            WHEN new.raw_user_meta_data ? 'skills' AND jsonb_typeof(new.raw_user_meta_data->'skills') = 'array'
            THEN ARRAY(SELECT jsonb_array_elements_text(new.raw_user_meta_data->'skills'))
            ELSE ARRAY[]::text[]
          END
      );
  END IF;

  -- If role is company, also insert into companies table
  IF role_val = 'company' THEN
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
          is_ai_provider,
          description
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
          COALESCE((new.raw_user_meta_data->>'is_ai_provider')::boolean, true),
          new.raw_user_meta_data->>'description'
      );
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
