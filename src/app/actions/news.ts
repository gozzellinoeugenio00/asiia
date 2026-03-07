'use server'

import { createClient } from '@/utils/supabase/server';
import { News } from '../../../types/models';

export const getNewsAsync = async (): Promise<{ data: News[]; error: any }> => {
    const supabase = await createClient();

    const { data: news, error } = await supabase
        .from('news')
        .select(`
            *
        `)
        .order('created_at', { ascending: false });

    return { data: news as News[], error };
}