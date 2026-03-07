"use client";
import { Globe, Users, Trophy, Search, Building2, Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import { Company } from "../../../types/models";
import { getCompaniesAsync } from "../actions/companies";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"providers" | "seekers">("providers");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCompanies = async () => {
    setLoading(true);
    const isProvider = activeTab === "providers";
    const response = await getCompaniesAsync(isProvider);
    if (response.data) {
      setCompanies(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCompanies();
  }, [activeTab]);

  const filteredCompanies = companies.filter(company =>
    company.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Aziende all'<span className="gradient-text">Avanguardia</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connettiti con il cuore pulsante dell'innovazione AI in Italia.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
        <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl glass">
          <button
            onClick={() => setActiveTab("providers")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-bold ${activeTab === "providers"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            <Building2 className="w-5 h-5" />
            Offerta Servizi AI
          </button>
          <button
            onClick={() => setActiveTab("seekers")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-bold ${activeTab === "seekers"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            <Search className="w-5 h-5" />
            Ricerca Soluzioni/Talenti
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Cerca per nome o settore..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 glass transition-all"
          />
        </div>
      </div>

      {/* Information Box */}
      <div className="max-w-4xl mx-auto mb-16 glass p-8 rounded-3xl border-primary/20 bg-primary/5">
        <div className="flex items-start gap-4">
          <div className="bg-primary/20 p-3 rounded-2xl shrink-0">
            <Rocket className="text-primary w-6 h-6" />
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {activeTab === "providers"
              ? "In questa sezione trovi le aziende specializzate nello sviluppo e integrazione di soluzioni di Intelligenza Artificiale, pronte ad accompagnare il tuo business nel futuro."
              : "Qui sono elencate le realtà alla ricerca di competenze AI, partner tecnologici o professionisti per implementare l'innovazione nei propri processi produttivi."}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredCompanies.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="glass rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${activeTab === "providers" ? 'bg-primary/20' : 'bg-purple-500/20'} rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150`} />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl font-bold text-primary overflow-hidden">
                    {company.website ? (
                      <img
                        src={`https://logo.clearbit.com/${new URL(company.website.startsWith('http') ? company.website : `https://${company.website}`).hostname}`}
                        alt={company.company_name}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                    ) : (
                      <span>{company.company_name.charAt(0)}</span>
                    )}
                  </div>
                  <a
                    href={company.website || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground p-3 rounded-xl transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                </div>

                <h3 className="text-2xl font-bold mb-2 line-clamp-1">{company.company_name}</h3>
                <p className="text-primary font-medium mb-4 uppercase text-xs tracking-wider">
                  {company.industry}
                </p>

                <p className="text-muted-foreground mb-6 flex-1 line-clamp-3">
                  {company.city}, {company.province} — {company.referent_role}
                </p>

                <div className="flex items-center gap-6 mb-6 text-sm text-foreground/80">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{company.company_type}</span>
                  </div>
                </div>

                <button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                  Dettagli Azienda
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass rounded-[3rem]">
          <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-20" />
          <h3 className="text-2xl font-bold mb-2">Nessuna azienda trovata</h3>
          <p className="text-muted-foreground">Prova ad affinare la ricerca o cambia categoria.</p>
        </div>
      )}
    </div>
  );
}
