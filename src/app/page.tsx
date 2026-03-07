import Link from "next/link";
import { ArrowRight, Bot, Users, Building2, Newspaper } from "lucide-react";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-background z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full z-0" />

        <div className="container relative z-10 mx-auto px-4 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm mb-8 glass">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            Il network per i professionisti dell'Intelligenza Artificiale
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl">
            <span className="gradient-text">ASIAA </span> <br />
            Associazione Sviluppo e Integrazione Intelligenza Artificiale
          </h1>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
            Unisciti ad ASIIA. La prima associazione no profit, con marchio
            registrato a livello Europeo a creare un'ecosistema dove aziende,
            professionisti,appassionati e studenti possono entrare in contatto
            tra loro
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md mx-auto">
            <Link
              href="/register"
              className="group flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3 px-8 rounded-full hover:bg-primary/90 transition-all hover:scale-105"
            >
              Inizia Ora
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="flex items-center justify-center gap-2 glass font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition-all"
            >
              Scopri di più
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Professionisti AI</h3>
              <p className="text-muted-foreground">
                Crea il tuo profilo, mostra i tuoi progetti e connettiti con le
                aziende che cercano le tue competenze in machine learning, data
                science e AI engineering.
              </p>
            </div>

            <div className="glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Aziende Innovative</h3>
              <p className="text-muted-foreground">
                Trova i migliori talenti per scalare il tuo business. Esplora
                profili verificati e contatta direttamente i professionisti per
                i tuoi progetti innovativi.
              </p>
            </div>

            <div className="glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Newspaper className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">News e Aggiornamenti</h3>
              <p className="text-muted-foreground">
                Resta sempre aggiornato sulle ultime novità, i trend tecnologici
                e le scoperte nel mondo dell'Intelligenza Artificiale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 z-0" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <Bot className="w-16 h-16 mx-auto text-primary mb-6 animate-float" />
          <h2 className="text-4xl font-bold mb-6">
            Pronto a far parte della rivoluzione?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            La community di ASIIA ti aspetta. Che tu sia un professionista,
            un'azienda o un appassionato.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center justify-center bg-foreground text-background font-bold py-4 px-10 rounded-full hover:scale-105 transition-transform"
          >
            Crea il tuo Account Gratuito
          </Link>
        </div>
      </section>
    </div>
  );
}
