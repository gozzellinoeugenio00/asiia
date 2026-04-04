'use server'

import { createClient } from '@/utils/supabase/server';
import { News } from '../../../types/models';
import { revalidatePath } from 'next/cache';

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

export const createNewsAsync = async (formData: FormData): Promise<{ success: boolean; error?: any }> => {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return { success: false, error: 'Non autorizzato' };
        }

        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const category = formData.get('category') as string;
        const excerpt = formData.get('excerpt') as string;
        const imageFile = formData.get('imageFile') as File | null;
        let imageUrl = formData.get('imageUrl') as string | null;

        if (!title) {
            return { success: false, error: 'Il titolo è obbligatorio' };
        }

        // Gestione upload file
        if (imageFile && imageFile.size > 0) {
            const fs = await import('fs/promises');
            const path = await import('path');
            
            const bytes = await imageFile.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Crea la cartella se non esiste
            const uploadDir = path.join(process.cwd(), 'public', 'images', 'news');
            try {
                await fs.access(uploadDir);
            } catch {
                await fs.mkdir(uploadDir, { recursive: true });
            }

            // Genera nome file unico
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const filename = `${uniqueSuffix}-${imageFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
            const filepath = path.join(uploadDir, filename);

            await fs.writeFile(filepath, buffer);
            imageUrl = `/images/news/${filename}`;
        }

        const { error } = await supabase
            .from('news')
            .insert({
                title,
                content: content || null,
                category: category || null,
                excerpt: excerpt || null,
                image_url: imageUrl || null,
                author_id: user.id
            });

        if (error) throw error;

        revalidatePath('/news');
        return { success: true };
    } catch (e: any) {
        console.error('Errore durante la creazione della news:', e);
        return { success: false, error: e.message };
    }
}