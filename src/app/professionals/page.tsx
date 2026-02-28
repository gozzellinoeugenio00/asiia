import { Search, MapPin, Briefcase } from 'lucide-react';

const mockProfessionals = [
    {
        id: 1,
        name: 'Eleonora Bianchi',
        role: 'Senior AI Engineer',
        company: 'TechCorp',
        location: 'Milano, Italia',
        skills: ['Machine Learning', 'Python', 'TensorFlow'],
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80',
        available: true
    },
    {
        id: 2,
        name: 'Marco Rossi',
        role: 'Data Scientist',
        company: 'InnovateAI',
        location: 'Roma, Italia',
        skills: ['NLP', 'PyTorch', 'Data Analysis'],
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop&q=80',
        available: false
    },
    {
        id: 3,
        name: 'Giulia Verdi',
        role: 'MLOps Engineer',
        company: 'FutureSystems',
        location: 'Torino, Italia',
        skills: ['Docker', 'Kubernetes', 'CI/CD per ML'],
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&q=80',
        available: true
    }
];

export default function ProfessionalsPage() {
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
                    placeholder="Cerca per competenza, ruolo o nome..."
                    className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 glass transition-all"
                />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProfessionals.map((pro) => (
                    <div key={pro.id} className="glass rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <img
                                    src={pro.avatar}
                                    alt={pro.name}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                                />
                                {pro.available && (
                                    <span className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                                        Disponibile
                                    </span>
                                )}
                            </div>

                            <h3 className="text-xl font-bold mb-1">{pro.name}</h3>
                            <p className="text-primary font-medium mb-4">{pro.role}</p>

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
                                {pro.skills.map((skill) => (
                                    <span key={skill} className="bg-white/5 border border-white/10 text-xs px-3 py-1 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <button className="w-full mt-6 bg-white/5 hover:bg-primary text-foreground hover:text-primary-foreground font-medium py-2 rounded-xl border border-white/10 transition-colors">
                                Visualizza Profilo
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
