'use client'
import { Search, MapPin, Briefcase } from 'lucide-react';
import { ProfessionalWithProfile } from '../../../types/models';
import { getProfessionalsAsync } from '../actions/professionals';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import LoaderAsiia from '@/components/LoaderAsiia';


export default function ProfessionalsPage() {
    const [professionals, setProfessionals] = useState<ProfessionalWithProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchProfessionals = async () => {
        setLoading(true);
        const response = await getProfessionalsAsync();
        if (response.data) {
            setProfessionals(response.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProfessionals();
    }, []);

    const filteredProfessionals = professionals.filter(professional =>
        professional.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        professional.role_title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                    Trova i migliori <span className="gradient-text">Professionisti AI</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Esplora la nostra rete di esperti in Intelligenza Artificiale, Machine Learning e Data Science.
                </p>
            </div>

            <div className="max-w-xl mx-auto mb-12 relative animate-float">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                    type="text"
                    placeholder="Cerca per competenza, ruolo o bio..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 glass transition-all"
                />
            </div>

            {loading ? (
                <LoaderAsiia />
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProfessionals.map((pro) => (
                        <div key={pro.profile_id} className="glass rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
                            <div className="absolute inset-0 from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <img
                                        src={pro.profile.avatar_url ?? (pro.profile.first_name ? `https://ui-avatars.com/api/?name=${encodeURIComponent(pro.profile.first_name)}+${encodeURIComponent(pro.profile.last_name ?? '')}&background=random` : '/avatar.png')}
                                        alt={`${pro.profile.first_name ?? ''} ${pro.profile.last_name ?? ''}`.trim() || 'Professional'}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                                    />
                                    {pro.available && (
                                        <span className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                                            Disponibile
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold mb-1">
                                    {pro.profile.first_name ?? ''} {pro.profile.last_name ?? ''}
                                    {(!pro.profile.first_name && !pro.profile.last_name) && 'Professional'}
                                </h3>
                                <h4 className=" font-medium mb-1">{pro.bio}</h4>
                                <p className="text-primary mb-4">{pro.role_title}</p>

                                <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="w-4 h-4" />
                                        <span>{pro.company}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        <span>{pro.location}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {pro.skills?.map((skill) => (
                                        <span key={skill} className="bg-white/5 border border-white/10 text-xs px-3 py-1 rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                <Link
                                    href={`/portfolio/${pro.profile_id}`}
                                    className="w-full mt-6 flex items-center justify-center bg-white/5 hover:bg-primary text-foreground hover:text-primary-foreground font-medium py-2 rounded-xl border border-white/10 transition-colors"
                                >
                                    Visualizza Profilo
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
