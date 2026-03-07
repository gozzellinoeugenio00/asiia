'use server'

import { createClient } from '@/utils/supabase/server';
import { Company } from '../../../types/models';

export const getCompaniesAsync = async (isProvider?: boolean): Promise<{ data: Company[]; error: any }> => {
    const supabase = await createClient();
    let { data: companies, error } = await supabase
        .from('companies')
        .select('*')
    console.log(companies)
    return { data: companies as Company[], error };
}
