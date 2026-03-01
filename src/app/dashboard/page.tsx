import { Users, Briefcase, MessagesSquare, Activity, ChevronRight, BarChart, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

export default async function DashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fallback if metadata is missing
    const role = user?.user_metadata?.role || 'professional';
    const name = user?.user_metadata?.first_name || 'Utente';
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Benvenuto, {name} 👋</h1>
                    <p className="text-muted-foreground">Ecco una panoramica della community ASIIA oggi.</p>
                </div>

                <div className="flex gap-4">
                    {role === 'professional' ? (
                        <Link href="/portfolio" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:-translate-y-1">
                            <Briefcase className="w-5 h-5" />
                            Gestisci il tuo Portfolio
                        </Link>
                    ) : (
                        <Link href="/annunci" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:-translate-y-1">
                            <ExternalLink className="w-5 h-5" />
                            Pubblica Annuncio
                        </Link>
                    )}
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Users className="w-16 h-16" />
                    </div>
                    <p className="text-muted-foreground font-medium mb-1">Totale visualizzazioni del profilo</p>
                    <div className="flex items-end gap-3">
                        <h2 className="text-4xl font-extrabold">1,245</h2>
                        <span className="text-emerald-400 text-sm font-bold bg-emerald-400/10 px-2 py-1 rounded">+12%</span>
                    </div>
                </div>

                <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Briefcase className="w-16 h-16" />
                    </div>
                    <p className="text-muted-foreground font-medium mb-1">Aziende Contattate</p>
                    <div className="flex items-end gap-3">
                        <h2 className="text-4xl font-extrabold">340</h2>
                        <span className="text-emerald-400 text-sm font-bold bg-emerald-400/10 px-2 py-1 rounded">+5%</span>
                    </div>
                </div>

                <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <MessagesSquare className="w-16 h-16" />
                    </div>
                    <p className="text-muted-foreground font-medium mb-1">Connessioni Attive</p>
                    <div className="flex items-end gap-3">
                        <h2 className="text-4xl font-extrabold">8,930</h2>
                        <span className="text-emerald-400 text-sm font-bold bg-emerald-400/10 px-2 py-1 rounded">+24%</span>
                    </div>
                </div>

                <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Activity className="w-16 h-16" />
                    </div>
                    <p className="text-muted-foreground font-medium mb-1">Visite Mensili</p>
                    <div className="flex items-end gap-3">
                        <h2 className="text-4xl font-extrabold">45.2K</h2>
                        <span className="text-red-400 text-sm font-bold bg-red-400/10 px-2 py-1 rounded">-2%</span>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass p-8 rounded-3xl border border-white/5">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <BarChart className="text-primary w-5 h-5" />
                            Crescita Community
                        </h3>
                        <button className="text-sm bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors font-medium">
                            Vedi Report Completo
                        </button>
                    </div>

                    <div className="h-64 w-full flex items-end justify-between gap-2 px-2">
                        {[30, 40, 35, 50, 45, 60, 55, 75, 65, 80, 70, 90].map((val, i) => (
                            <div key={i} className="w-full bg-primary/20 rounded-t-lg relative group transition-all duration-300 hover:bg-primary" style={{ height: `${val}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {val * 10}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass p-8 rounded-3xl border border-white/5">
                    <h3 className="text-xl font-bold mb-6 flex items-center justify-between">
                        Ultimi Iscritti
                        <Link href="/professionals" className="text-sm text-primary hover:underline font-medium flex items-center">
                            Vedi tutti <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                    </h3>

                    <div className="space-y-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-4 group">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-purple-500/40 border border-white/10" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-sm group-hover:text-primary transition-colors">Utente {i}</h4>
                                    <p className="text-xs text-muted-foreground font-medium">Data Scientist @ Azienda {i}</p>
                                </div>
                                <div className="text-xs text-muted-foreground whitespace-nowrap">
                                    {i} ore fa
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
