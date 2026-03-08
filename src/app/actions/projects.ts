'use server'

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { Project } from '../../../types/models';


export async function getProjects() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { data: null, error: new Error('User not authenticated') };
    }

    const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    return { data: projects, error };
}

export async function addProject(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (title && description) {
        await supabase.from('projects').insert({
            user_id: user.id,
            title,
            description,
        });
        revalidatePath('/portfolio');
    }
}

export async function deleteProject(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const id = formData.get('id') as string;
    if (id) {
        await supabase.from('projects').delete().eq('id', id).eq('user_id', user.id);
        revalidatePath('/portfolio');
    }
}

export async function getProjectsByUserIdAsync(userId: string): Promise<{ data: Project[]; error: any }> {
    const supabase = await createClient();

    const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    return { data: (projects || []) as Project[], error };
}

