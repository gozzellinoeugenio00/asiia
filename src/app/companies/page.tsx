"use client";
import { Globe, Users, Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const mockCompanies = [
  {
    id: 1,
    name: "TechNova",
    industry: "Financial Technology",
    employees: "50-200",
    location: "Milano, Italia",
    description:
      "Sviluppiamo soluzioni AI per frodi finanziarie e analisi del rischio predittiva.",
    tags: ["Fintech", "AI", "Machine Learning"],
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop&q=80",
  },
  {
    id: 2,
    name: "HealthBrain AI",
    industry: "Healthcare",
    employees: "10-50",
    location: "Roma, Italia",
    description:
      "Piattaforma di diagnostica avanzata basata su deep learning e computer vision per analizzare radiografie.",
    tags: ["Healthtech", "Computer Vision"],
    logo: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=150&h=150&fit=crop&q=80",
  },
  {
    id: 3,
    name: "EcoSmart",
    industry: "Green Energy",
    employees: "200+",
    location: "Torino, Italia",
    description:
      "Ottimizzazione di reti elettriche intelligenti attraverso modelli predittivi.",
    tags: ["Greentech", "Data Science", "IoT"],
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=150&h=150&fit=crop&q=80",
  },
];

export default function CompaniesPage() {
  const [expandText, setExpandText] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Aziende all'<span className="gradient-text">Avanguardia</span>
        </h1>
        <p className=" text-muted-foreground max-w-2xl mx-auto">
          Scopri le aziende che stanno plasmando il futuro attraverso
          l'Intelligenza Artificiale. ASIAA per le aziende si pone come
          l'ecosistema perfetto per riuscire ad integrare e sviluppare
          l'Intelligenza Artificiale all'interno dei processi produttivi
          {expandText ? "." : "..."}
        </p>
        {expandText && (
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Registrandosi nel form (la registrazione non ha o implica nessun
            costo) si accede al database che è diviso in due parti, la prima
            parte comprende i dati delle aziende che sviluppano ed integrano
            l'IA all'interno dei processi produttivi e possono fornirti il
            servizio che vi interessa. Dall'altra parte ci sono le aziende che
            invece si sono registrate per scrivere news, pubblicare offerte di
            lavoro, contattare professionisti, rimanere aggiornati sulle news
            compresi i bandi con i fondi del PNRR.
          </p>
        )}
        <button
          onClick={() => setExpandText(!expandText)}
          className="mt-4 text-sm text-primary hover:underline"
        >
          {expandText ? "Mostra meno" : "Mostra di più"}
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockCompanies.map((company) => (
          <div
            key={company.id}
            className="glass rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-start justify-between mb-6">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white/10 shadow-xl"
                />
                <button className="bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground p-3 rounded-xl transition-colors">
                  <Globe className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-2xl font-bold mb-2">{company.name}</h3>
              <p className="text-primary font-medium mb-4">
                {company.industry}
              </p>

              <p className="text-muted-foreground mb-6 flex-1">
                {company.description}
              </p>

              <div className="flex items-center gap-6 mb-6 text-sm text-foreground/80">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{company.employees} DIP.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-purple-500" />
                  <span>{company.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {company.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/5 border border-white/10 text-xs px-3 py-1 rounded-full text-foreground/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button className="w-full mt-8 bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-3 rounded-xl transition-colors">
                Contatta l'Azienda
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
