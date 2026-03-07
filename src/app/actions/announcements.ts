'use server'

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { AnnouncementWithCompany } from '../../../types/models';

export async function getAnnouncements(): Promise<{ data: AnnouncementWithCompany[]; error: Error | null }> {
    const supabase = await createClient();

    const { data: announcements, error } = await supabase
        .from('announcements')
        .select(`
            *,
            companies(company_name)
        `)
        .order('created_at', { ascending: false });

    return { data: announcements as AnnouncementWithCompany[], error };
}

export async function addAnnouncement(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || user.user_metadata?.role !== 'company') return;

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (title && description) {
        await supabase.from('announcements').insert({
            company_id: user.id,
            title,
            description,
        });
        revalidatePath('/annunci');
    }
}
