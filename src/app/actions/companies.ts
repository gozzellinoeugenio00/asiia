'use server'

import { createClient } from '@/utils/supabase/server';
import { Company } from '../../../types/models';

export const getCompaniesAsync = async (isAiProvider?: boolean): Promise<{ data: Company[]; error: any }> => {
    const supabase = await createClient();
    
    console.log('Fetching companies with isAiProvider:', isAiProvider);
    
    let query = supabase.from('companies').select('*');
    
    if (isAiProvider !== undefined) {
        query = query.eq('is_ai_provider', isAiProvider);
    }
    
    const { data: companies, error } = await query;
    
    if (error) {
        console.error('Error fetching companies:', error);
    } else {
        console.log(`Fetched ${companies?.length || 0} companies`);
    }
    
    return { data: companies as Company[], error };
}

export const getCompanyByIdAsync = async (id: string): Promise<{ data: Company | null; error: any }> => {
    const supabase = await createClient();
    
    const { data: company, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .single();
    
    return { data: company as Company, error };
}
