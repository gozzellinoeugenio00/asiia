'use server'

import { createClient } from '@/utils/supabase/server';
import { Company } from '../../../types/models';

export const getCompaniesAsync = async (isProvider?: boolean): Promise<{ data: Company[]; error: any }> => {
    const supabase = await createClient();

    let query = supabase
        .from('companies')
        .select(`
            *
        `);

    if (isProvider !== undefined) {
        query = query.eq('is_ai_provider', isProvider);
    }

    const { data: companies, error } = await query.order('company_name', { ascending: true });

    return { data: companies as Company[], error };
}
