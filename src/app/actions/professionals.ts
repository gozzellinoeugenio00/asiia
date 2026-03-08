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

export const getProfessionalByIdAsync = async (profileId: string): Promise<{ data: ProfessionalWithProfile | null; error: any }> => {
    const supabase = await createClient();

    const { data: professional, error } = await supabase
        .from('professionals')
        .select(`
            *,
            profile:profiles(*)
        `)
        .eq('profile_id', profileId)
        .single();

    return { data: professional as ProfessionalWithProfile, error };
}