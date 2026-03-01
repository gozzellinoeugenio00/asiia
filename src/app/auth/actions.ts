'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/login?error=true&message=' + error.message)
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        options: {
            data: {
                first_name: formData.get('first_name') as string,
                last_name: formData.get('last_name') as string,
                role: formData.get('role') as string, // 'professional' or 'company'
                ...(formData.get('role') === 'company' && {
                    company_name: formData.get('company_name') as string,
                    vat_number: formData.get('vat_number') as string,
                    tax_code: formData.get('tax_code') as string,
                    industry: formData.get('industry') as string,
                    company_type: formData.get('company_type') as string,
                    address: formData.get('address') as string,
                    address_number: formData.get('address_number') as string,
                    city: formData.get('city') as string,
                    zip_code: formData.get('zip_code') as string,
                    province: formData.get('province') as string,
                    operating_office: formData.get('operating_office') as string,
                    pec_email: formData.get('pec_email') as string,
                    phone: formData.get('phone') as string,
                    website: formData.get('website') as string,
                    sdi_code: formData.get('sdi_code') as string,
                    billing_pec: formData.get('billing_pec') as string,
                    referent_role: formData.get('referent_role') as string,
                    mobile_phone: formData.get('mobile_phone') as string,
                })
            }
        }
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        redirect('/register?error=true&message=' + error.message)
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard') // or a success page depending on email confirmation setting
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}
