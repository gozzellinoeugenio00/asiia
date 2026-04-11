-- Update the handle_new_user function to support user, professional, and company roles
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into profiles for everyone
  INSERT INTO public.profiles (id, first_name, last_name, role)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'role'
  );

  -- If role is professional, insert into professionals table
  IF new.raw_user_meta_data->>'role' = 'professional' THEN
      INSERT INTO public.professionals (
          profile_id,
          available
      ) VALUES (
          new.id,
          true
      );
  END IF;

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
