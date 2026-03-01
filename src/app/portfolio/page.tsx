import { ArrowLeft, Briefcase, PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';

import { getProjects, addProject, deleteProject } from '@/app/actions/projects';

export default async function PortfolioPage() {
    const { data: projects } = await getProjects();

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Torna alla Dashboard
            </Link>

            <div className="mb-8 flex items-center gap-4">
                <div className="bg-primary/20 p-4 rounded-2xl">
                    <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">Il Mio Portfolio</h1>
                    <p className="text-muted-foreground">Gestisci e mostra i tuoi progetti professionali passati.</p>
                </div>
            </div>

            <div className="glass p-8 rounded-3xl border border-white/5 mb-10 shadow-lg">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                    <PlusCircle className="text-primary w-5 h-5" />
                    Aggiungi Nuovo Progetto
                </h2>
                <form action={addProject} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="title">Titolo del Progetto *</label>
                        <input id="title" name="title" type="text" required placeholder="Es. Modello Predittivo AI" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="description">Descrizione *</label>
                        <textarea id="description" name="description" required rows={4} placeholder="Descrivi il ruolo che hai avuto, gli strumenti usati e il risultato..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium resize-none"></textarea>
                    </div>
                    <button type="submit" className="w-full sm:w-auto bg-primary text-primary-foreground font-bold py-3 px-6 rounded-xl hover:bg-primary/90 transition-colors shadow">
                        Salva Progetto
                    </button>
                </form>
            </div>

            <div className="space-y-6">
                <h2 className="text-xl font-bold mt-12 mb-4 border-b border-white/10 pb-4">I Tuoi Progetti Inseriti</h2>
                {(!projects || projects.length === 0) ? (
                    <div className="text-center py-12 glass rounded-3xl border border-white/5">
                        <p className="text-muted-foreground">Nessun progetto trovato. Inizia ad aggiungere il tuo primo progetto!</p>
                    </div>
                ) : (
                    projects.map((project) => (
                        <div key={project.id} className="glass p-6 rounded-2xl border border-white/5 relative group hover:border-white/20 transition-all shadow-md">
                            <h3 className="text-lg font-bold text-primary mb-2 pr-10">{project.title}</h3>
                            <p className="text-muted-foreground whitespace-pre-wrap">{project.description}</p>
                            <form action={deleteProject} className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <input type="hidden" name="id" value={project.id} />
                                <button type="submit" title="Elimina Progetto" className="text-destructive hover:bg-destructive/20 p-2 rounded-full transition-colors">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </form>
                            <p className="text-xs text-muted-foreground mt-4 opacity-50">Inserito il {new Date(project.created_at).toLocaleDateString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
