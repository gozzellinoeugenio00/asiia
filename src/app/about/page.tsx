import { Bot, Lightbulb, Users, Globe, Target, ShieldCheck, Heart, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chi Siamo",
    description: "Scopri la missione, la visione e i valori di ASIIA, la prima associazione no profit dedicata all'Intelligenza Artificiale in Italia.",
};

export default function AboutPage() {
    return (
        <div className="flex-1 flex flex-col ">
            {/* Hero Section */}
            <section className="relative overflow-hidden pb-20">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full z-0" />
                <div className="container relative z-10 mx-auto px-4 text-center pt-24">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        Chi <span className="gradient-text">Siamo</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
                        ASIIA è la prima associazione no profit dedicata allo sviluppo e all'integrazione dell'Intelligenza Artificiale, con marchio registrato a livello Europeo. Siamo il ponte tra il talento tecnologico e le necessità del mercato.
                    </p>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-20 bg-background/50 border-y border-white/10 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className="glass p-10 rounded-[2.5rem] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:text-primary transition-all duration-500">
                                <Target size={120} />
                            </div>
                            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-8">
                                <Target className="text-primary w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold mb-6">La nostra Missione</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Creare un ecosistema inclusivo e dinamico in cui aziende, professionisti, appassionati e studenti possano collaborare per plasmare il futuro dell'AI. Ci impegniamo a democratizzare l'accesso alle competenze di Intelligenza Artificiale e a facilitare opportunità di crescita reale.
                            </p>
                        </div>
                        <div className="glass p-10 rounded-[2.5rem] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:text-purple-500 transition-all duration-500">
                                <Globe size={120} />
                            </div>
                            <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-8">
                                <Globe className="text-purple-500 w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold mb-6">La nostra Visione</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Aspiriamo a diventare l'Hub di riferimento in Europa per lo sviluppo dell'Intelligenza Artificiale, promuovendo un'innovazione che sia non solo tecnologicamente avanzata, ma anche etica, sostenibile e centrata sull'uomo.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24">
                <div className="container mx-auto px-4 text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">I nostri <span className="gradient-text">Valori</span></h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Quello che ci spinge ogni giorno a migliorare e a far crescere la nostra community.
                    </p>
                </div>
                <div className="container mx-auto px-4">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Lightbulb, title: "Innovazione", text: "Promuoviamo costantemente la ricerca e l'adozione di nuove tecnologie.", color: "text-blue-500", bg: "bg-blue-500/10" },
                            { icon: ShieldCheck, title: "Etica", text: "Supportiamo uno sviluppo AI responsabile e trasparente.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
                            { icon: Users, title: "Integrazione", text: "Uniamo mondi diversi: accademia, professionisti e settore industriale.", color: "text-purple-500", bg: "bg-purple-500/10" },
                            { icon: Sparkles, title: "Eccellenza", text: "Puntiamo alla massima qualità in ogni iniziativa e connessione che creiamo.", color: "text-amber-500", bg: "bg-amber-500/10" }
                        ].map((value, idx) => (
                            <div key={idx} className="glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
                                <div className={`w-14 h-14 ${value.bg} rounded-2xl flex items-center justify-center mb-6`}>
                                    <value.icon className={`w-7 h-7 ${value.color}`} />
                                </div>
                                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{value.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story/Community Section */}
            <section className="py-24 relative">
                <div className="absolute top-0 right-0 p-24 opacity-5 pointer-events-none">
                    <Bot size={400} />
                </div>
                <div className="container mx-auto px-4 text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Un ecosistema in <span className="gradient-text">continua crescita</span></h2>
                    <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                        ASIIA non è solo un acronimo; è un movimento nato per fare chiarezza nel complesso mondo dell'AI, offrendo risorse concrete per eccellere.
                    </p>
                </div>
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-[3rem] p-10 md:p-16 glass relative overflow-hidden">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="space-y-6 text-left">
                                <h3 className="text-3xl font-bold">Un Database, <span className="text-primary">Mille Opportunità</span></h3>
                                <p className="text-muted-foreground leading-relaxed italic">
                                    "La registrazione non ha o implica nessun costo, ma apre le porte a un network d'eccellenza."
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    Il nostro database è strutturato per servire due anime: da un lato le aziende che sviluppano ed integrano l'IA, pronte a fornire servizi innovativi; dall'altro, organizzazioni che cercano talenti, pubblicano news, e restano aggiornate sui bandi strategici, compresi quelli legati ai fondi del <strong>PNRR</strong>.
                                </p>
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold border border-primary/20">
                                        Sviluppo & Integrazione
                                    </div>
                                    <div className="bg-purple-500/10 text-purple-500 px-4 py-2 rounded-full text-sm font-bold border border-purple-500/20">
                                        Networking Strategico
                                    </div>
                                    <div className="bg-emerald-500/10 text-emerald-500 px-4 py-2 rounded-full text-sm font-bold border border-emerald-500/20">
                                        Aggiornamenti PNRR
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { icon: Users, label: "Professionisti", desc: "Visibilità e progetti", color: "text-blue-500" },
                                    { icon: Target, label: "Aziende", desc: "Talento e processi", color: "text-purple-500" },
                                    { icon: Sparkles, label: "Studenti", desc: "Orientamento e futuro", color: "text-emerald-500" },
                                    { icon: Globe, label: "Appassionati", desc: "Confronto e news", color: "text-amber-500" }
                                ].map((item, idx) => (
                                    <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 transition-all text-left">
                                        <item.icon className={`w-8 h-8 ${item.color} mb-4`} />
                                        <h4 className="font-bold mb-1">{item.label}</h4>
                                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="glass p-12 md:p-16 rounded-[3rem] text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/5 -z-10" />
                        <Heart className="w-16 h-16 mx-auto text-primary mb-8 animate-pulse" />
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Unisciti alla Rivoluzione AI</h2>
                        <p className="text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
                            Sia che tu voglia offrire le tue competenze o che stia cercando il partner ideale per il tuo business, ASIIA è il posto giusto per te.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/register"
                                className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-4 px-10 rounded-full hover:scale-105 transition-all"
                            >
                                Entra in ASIIA
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/annunci"
                                className="flex items-center justify-center gap-2 glass font-bold py-4 px-10 rounded-full hover:bg-white/10 transition-all"
                            >
                                Esplora Opportunità
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
