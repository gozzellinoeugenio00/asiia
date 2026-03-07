import { useState } from "react";
import { AnnouncementWithCompany } from "../../types/models";
import { Link } from "lucide-react";

export default function AnnouncementsCard({ annuncio }: { annuncio: AnnouncementWithCompany }) {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <div key={annuncio.id} className="flex flex-col justify-between glass p-8 rounded-2xl border border-white/5 relative group hover:border-primary/50 transition-all shadow-md">
            <h3 className="text-2xl font-bold text-primary mb-3 leading-tight">{annuncio.title}</h3>
            {annuncio.companies?.company_name && (
                <div className="inline-block bg-primary/10 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full mb-4">
                    🏢 {annuncio.companies.company_name}
                </div>
            )}
            <div className="max-h-40 text-foreground whitespace-pre-wrap leading-relaxed overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                {annuncio.description}
            </div>
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between text-sm text-muted-foreground gap-4">
                <p className="opacity-70 flex items-center">
                    Inserito il {new Date(annuncio.created_at).toLocaleDateString()}
                </p>
                <button
                    onClick={() => annuncio.link_src && window.open(annuncio.link_src, "_blank", "noopener,noreferrer")}
                    className="bg-white/5 hover:bg-white/10 text-foreground font-medium px-6 py-2 rounded-xl transition-colors border border-white/10"
                >
                    Candidati
                </button>
            </div>
        </div>
    );
}