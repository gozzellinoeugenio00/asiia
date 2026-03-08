import { Project } from '../../../../types/models';
import { Metadata } from 'next';
import { ArrowLeft, Briefcase, MapPin, Code2, User } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProfessionalByIdAsync } from '@/app/actions/professionals';
import { getProjectsByUserIdAsync } from '@/app/actions/projects';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { id } = await params;
    const { data: pro } = await getProfessionalByIdAsync(id);

    if (!pro) return { title: 'Profilo non trovato' };

    const name = `${pro.profile.first_name ?? ''} ${pro.profile.last_name ?? ''}`.trim() || 'Professionista';
    const role = pro.role_title ?? 'Esperto AI';
    const description = pro.bio ? (pro.bio.substring(0, 160) + '...') : `Scopri il portfolio di ${name}, ${role} su ASIIA.`;

    return {
        title: `Portfolio: ${name}`,
        description,
        openGraph: {
            title: `${name} | Portfolio Professionale AI`,
            description,
            type: 'profile',
            images: pro.profile.avatar_url ? [{ url: pro.profile.avatar_url }] : [],
        }
    };
}


export default async function PublicPortfolioPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    const { data: pro, error: proError } = await getProfessionalByIdAsync(id);

    if (proError || !pro) {
        return notFound();
    }

    const { data: projects } = await getProjectsByUserIdAsync(id);

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <Link href="/professionals" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Torna alla lista professionisti
            </Link>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Profile Info Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass p-8 rounded-4xl border border-white/5 shadow-xl text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-24 bg-primary/10 -z-10" />

                        <div className="relative inline-block mb-6 pt-4">
                            <img
                                src={pro.profile.avatar_url ?? (pro.profile.first_name ? `https://ui-avatars.com/api/?name=${encodeURIComponent(pro.profile.first_name)}+${encodeURIComponent(pro.profile.last_name ?? '')}&background=random` : '/avatar.png')}
                                alt={`${pro.profile.first_name ?? ''} ${pro.profile.last_name ?? ''}`.trim() || 'Professional'}
                                className="w-32 h-32 rounded-full object-cover border-4 border-background shadow-lg"
                            />
                            {pro.available && (
                                <span className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 border-4 border-background rounded-full" title="Disponibile"></span>
                            )}
                        </div>

                        <h1 className="text-2xl font-bold mb-1">
                            {pro.profile.first_name ?? ''} {pro.profile.last_name ?? ''}
                        </h1>
                        <p className="text-primary font-medium mb-6">{pro.role_title}</p>

                        <div className="space-y-4 text-left">
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <MapPin className="w-5 h-5 text-primary/60" />
                                <span>{pro.location || 'Località non specificata'}</span>
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <Briefcase className="w-5 h-5 text-primary/60" />
                                <span>{pro.company || 'Libero professionista'}</span>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 text-left">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                                <Code2 className="w-4 h-4" /> Competenze
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {pro.skills?.map((skill) => (
                                    <span key={skill} className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full border border-primary/20">
                                        {skill}
                                    </span>
                                ))}
                                {(!pro.skills || pro.skills.length === 0) && (
                                    <span className="text-sm text-muted-foreground italic">Nessuna competenza inserita</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bio and Projects Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="glass p-8 rounded-4xl border border-white/5 shadow-lg">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <User className="text-primary w-5 h-5" /> Bio Professionale
                        </h2>
                        <p className="text-foreground leading-relaxed whitespace-pre-wrap text-lg">
                            {pro.bio || 'Il professionista non ha ancora inserito una biografia.'}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold flex items-center gap-3 mt-4">
                            <Briefcase className="text-primary w-6 h-6" /> Progetti del Portfolio
                        </h2>

                        {(!projects || projects.length === 0) ? (
                            <div className="bg-white/5 border border-white/10 rounded-4xl p-12 text-center">
                                <p className="text-muted-foreground text-lg">Nessun progetto disponibile nel portfolio.</p>
                            </div>
                        ) : (
                            <div className="grid gap-6 h-[calc(100vh-24rem)] overflow-y-auto">
                                {projects.map((project) => (
                                    <div key={project.id} className="glass p-8 rounded-4xl border border-white/5 hover:border-primary/30 transition-all shadow-md group">
                                        <h3 className="text-xl font-bold text-primary mb-3 group-hover:translate-x-1 transition-transform">{project.title}</h3>
                                        <p className="text-foreground/80 whitespace-pre-wrap leading-relaxed">
                                            {project.description}
                                        </p>
                                        <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center text-xs text-muted-foreground">
                                            <span className="opacity-60">
                                                Completato il {new Date(project.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
