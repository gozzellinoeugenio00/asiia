import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { Megaphone, BriefcaseBusiness, PlusCircle } from 'lucide-react';

export default async function AnnunciPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Check if user is a company to show the form
    const isCompany = user?.user_metadata?.role === 'company';

    // Fetch existing announcements with company names linked. Since we have companies table linked via auth.users, maybe we fetch companies individually or just rely on raw_user_meta_data if possible. But better simply join on our profiles/companies table if needed.
    // For simplicity, we just fetch announcements. If we created a profile linkage, we could potentially join.
    const { data: announcements, error } = await supabase
        .from('announcements')
        .select(`
            *,
            companies (
                company_name
            )
        `)
        .order('created_at', { ascending: false });

    async function addAnnouncement(formData: FormData) {
        'use server';
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

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="bg-primary/20 p-4 rounded-2xl">
                        <Megaphone className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Bacheca Annunci</h1>
                        <p className="text-muted-foreground mt-1 text-lg">Scopri le ultime opportunità pubblicate dalle aziende della community.</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start relative">
                <div className="lg:col-span-2 space-y-6">
                    {(!announcements || announcements.length === 0) ? (
                        <div className="text-center py-16 glass rounded-3xl border border-white/5">
                            <BriefcaseBusiness className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                            <p className="text-xl text-muted-foreground font-medium">Nessun annuncio presente al momento.</p>
                            <p className="text-sm text-muted-foreground mt-2">Torna a trovarci presto per nuove opportunità.</p>
                        </div>
                    ) : (
                        announcements.map((annuncio) => (
                            <div key={annuncio.id} className="glass p-8 rounded-2xl border border-white/5 relative group hover:border-primary/50 transition-all shadow-md">
                                <h3 className="text-2xl font-bold text-primary mb-3 leading-tight">{annuncio.title}</h3>
                                {annuncio.companies?.company_name && (
                                    <div className="inline-block bg-primary/10 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full mb-4">
                                        🏢 {annuncio.companies.company_name}
                                    </div>
                                )}
                                <p className="text-foreground whitespace-pre-wrap leading-relaxed">{annuncio.description}</p>
                                <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between text-sm text-muted-foreground gap-4">
                                    <p className="opacity-70 flex items-center">
                                        Inserito il {new Date(annuncio.created_at).toLocaleDateString()}
                                    </p>
                                    <button className="bg-white/5 hover:bg-white/10 text-foreground font-medium px-6 py-2 rounded-xl transition-colors border border-white/10">
                                        Candidati
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {isCompany && (
                    <div className="lg:col-span-1 lg:sticky lg:top-24">
                        <div className="glass p-6 rounded-3xl border border-primary/30 relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

                            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                                <PlusCircle className="text-primary w-5 h-5" />
                                Inserisci un Annuncio
                            </h2>
                            <form action={addAnnouncement} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium opacity-80" htmlFor="title">Titolo Ricerca</label>
                                    <input id="title" name="title" type="text" required placeholder="Es. Cercasi AI Engineer" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium opacity-80" htmlFor="description">Descrizione / Requisiti</label>
                                    <textarea id="description" name="description" required rows={7} placeholder="Descrivi il profilo professionale ricercato, le competenze necessarie..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium resize-none"></textarea>
                                </div>
                                <button type="submit" className="w-full bg-primary text-primary-foreground font-bold py-3 px-4 rounded-xl hover:bg-primary/90 transition-transform hover:-translate-y-0.5 shadow-lg mt-2">
                                    Pubblica subito
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
