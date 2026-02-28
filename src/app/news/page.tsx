import { Calendar, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const mockNews = [
    {
        id: 1,
        title: 'Il Futuro dei LLM e il loro impatto sulle aziende',
        excerpt: 'L\'adozione dei Large Language Models sta trasformando rapidamente i processi aziendali in Europa.',
        date: '10 Ottobre 2026',
        category: 'Tecnologia',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500&h=300&fit=crop&q=80',
    },
    {
        id: 2,
        title: 'Nuova conferenza ASIIA a Milano',
        excerpt: 'Si terrà il prossimo mese la riunione annuale per connettere start-up AI e professionisti.',
        date: '5 Ottobre 2026',
        category: 'Eventi',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop&q=80',
    },
    {
        id: 3,
        title: 'Nuove regole AI Act: Cosa cambia per gli sviluppatori?',
        excerpt: 'Una guida pratica su come adeguare i propri modelli di machine learning alla nuova normativa europea.',
        date: '1 Ottobre 2026',
        category: 'Normative',
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500&h=300&fit=crop&q=80',
    }
];

export default function NewsPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-end mb-16">
                <div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Ultime <span className="gradient-text">News</span>
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Resta aggiornato sul mondo AI e sulle novità di ASIIA.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockNews.map((news) => (
                    <div key={news.id} className="glass rounded-3xl overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col">
                        <div className="relative h-64 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10" />
                            <img
                                src={news.image}
                                alt={news.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4 z-20">
                                <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                                    {news.category}
                                </span>
                            </div>
                        </div>

                        <div className="p-8 flex-1 flex flex-col relative z-20 -mt-10">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                <Calendar className="w-4 h-4" />
                                <span>{news.date}</span>
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
                ))}
            </div>
        </div>
    );
}
