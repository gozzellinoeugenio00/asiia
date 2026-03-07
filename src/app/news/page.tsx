"use client";
import { Calendar, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { News } from '../../../types/models';
import { getNewsAsync } from '../actions/news';
import NewsCard from '@/components/NewsCard';

export default function NewsPage() {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            const response = await getNewsAsync();
            const data = response.data;
            setNews(data);
            setLoading(false);
        };
        fetchNews();
    }, []);

    return (

        <div className="container mx-auto">
            {/* Hero Section */}
            <section className="relative overflow-hidden pb-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full z-0" />
                <div className="container relative z-10 mx-auto px-4 text-center pt-24">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Ultime <span className="gradient-text">News</span>
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Resta aggiornato sul mondo AI e sulle novità di ASIIA.
                    </p>
                </div>
            </section>


            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 py-20">
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                )}
                {news.map((news: News) => (
                    <div key={news.id} className="p-2">
                        <NewsCard news={news} />
                    </div>
                ))}
            </div>
        </div>
    );
}
