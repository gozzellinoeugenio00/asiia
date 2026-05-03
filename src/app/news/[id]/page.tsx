import { getNewsByIdAsync } from "../../actions/news";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { id } = await params;
    const { data: news } = await getNewsByIdAsync(id);

    if (!news) return { title: 'Articolo non trovato' };

    return {
        title: `${news.title} | ASIIA News`,
        description: news.excerpt || news.title,
    };
}

export default async function NewsDetailPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const { data: news, error } = await getNewsByIdAsync(id);

    if (error || !news) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Link href="/news" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Torna alle News
            </Link>

            <article className="glass rounded-[2.5rem] p-8 md:p-12 border-primary/10 overflow-hidden relative">
                {news.category && (
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-bold border border-primary/30 mb-6">
                        {news.category}
                    </span>
                )}
                
                <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
                    {news.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-10 pb-10 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                            {new Date(news.created_at ?? "").toLocaleDateString('it-IT')} {new Date(news.created_at ?? "").toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                </div>

                {news.image_url && (
                    <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-10 border border-white/10 relative">
                        <img 
                            src={news.image_url} 
                            alt={news.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="prose prose-invert prose-lg max-w-none prose-p:leading-relaxed prose-headings:text-foreground">
                    <div className="text-xl leading-relaxed whitespace-pre-wrap">
                        {news.content || news.excerpt || "Nessun contenuto disponibile per questo articolo."}
                    </div>
                </div>
            </article>
        </div>
    );
}
