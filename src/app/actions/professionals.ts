'use server'

import { createClient } from '@/utils/supabase/server';
import { Professional, ProfessionalWithProfile } from '../../../types/models';

export const getProfessionalsAsync = async (): Promise<{ data: ProfessionalWithProfile[]; error: any }> => {
    const supabase = await createClient();

    const { data: professionals, error } = await supabase
        .from('professionals')
        .select(`
            *,
            profile:profiles(*)
        `)
    console.log(professionals);
    return { data: professionals as ProfessionalWithProfile[], error };
}