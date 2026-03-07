import { News } from "../../types/models";
import { ArrowRight, Calendar } from "lucide-react";

export default function NewsCard({ news }: { news: News }) {
    return (
        <div key={news.id} className="glass rounded-3xl overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col">
            <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 from-background/90 to-transparent z-10" />
                <img
                    src={news.image_url || ''}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20">
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                        {news.category}
                    </span>
                </div>
            </div>

            <div className="p-8 flex-1 flex flex-col relative z-20 mt-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>
                        {new Date(news.created_at ?? "").toLocaleDateString('it-IT')} {new Date(news.created_at ?? "").toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>

                <h3 className="text-2xl font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                    {news.title}
                </h3>

                <p className="text-muted-foreground mb-8 flex-1 line-clamp-3">
                    {news.excerpt}
                </p>

                <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all w-fit">
                    Leggi l'Articolo <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}