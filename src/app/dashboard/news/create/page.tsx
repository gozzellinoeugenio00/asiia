'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createNewsAsync } from '@/app/actions/news';

export default function CreateNewsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        
        try {
            const result = await createNewsAsync(formData);
            if (result.success) {
                router.push('/news');
                router.refresh();
            } else {
                setError(result.error);
            }
        } catch (err: any) {
            setError(err.message || 'Errore imprevisto');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-6">Crea Nuova News</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-6 rounded-2xl glass">
                {error && (
                    <div className="p-4 bg-red-500/20 text-red-500 rounded-lg">
                        {error}
                    </div>
                )}

                <div>
                    <label htmlFor="title" className="block text-sm font-medium mb-2">Titolo *</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        required
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium mb-2">Categoria</label>
                    <input 
                        type="text" 
                        id="category" 
                        name="category" 
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium mb-2">Riassunto (Excerpt)</label>
                    <textarea 
                        id="excerpt" 
                        name="excerpt" 
                        rows={2}
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium mb-2">Contenuto Principale</label>
                    <textarea 
                        id="content" 
                        name="content" 
                        rows={6}
                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="border border-white/10 p-4 rounded-lg space-y-4">
                    <h3 className="font-medium text-sm">Immagine Principale</h3>
                    <p className="text-xs text-muted-foreground">Puoi caricare un file OPPURE inserire un link.</p>
                    
                    <div>
                        <label htmlFor="imageFile" className="block text-sm font-medium mb-2">Carica un file</label>
                        <input 
                            type="file" 
                            id="imageFile" 
                            name="imageFile" 
                            accept="image/*"
                            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
                        />
                    </div>

                    <div className="flex items-center">
                        <div className="h-px bg-white/10 flex-1"></div>
                        <span className="px-3 text-xs text-muted-foreground uppercase">Oppure</span>
                        <div className="h-px bg-white/10 flex-1"></div>
                    </div>

                    <div>
                        <label htmlFor="imageUrl" className="block text-sm font-medium mb-2">Inserisci un link URL</label>
                        <input 
                            type="url" 
                            id="imageUrl" 
                            name="imageUrl" 
                            placeholder="https://..."
                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Creazione in corso...' : 'Pubblica News'}
                    </button>
                </div>
            </form>
        </div>
    );
}
