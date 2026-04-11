import { getCompanyByIdAsync } from "../../actions/companies";
import { Globe, MapPin, Building2, Phone, Mail, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CompanyDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { data: company, error } = await getCompanyByIdAsync(params.id);

    if (error || !company) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <Link href="/companies" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Torna alle Aziende
            </Link>

            <div className="grid lg:grid-cols-3 gap-12">
                {/* Left Column: Info Card */}
                <div className="lg:col-span-1">
                    <div className="glass rounded-[2.5rem] p-8 sticky top-24 border-primary/20">
                        <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl font-bold text-primary overflow-hidden mb-6">
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

                        <h1 className="text-3xl font-extrabold mb-2">{company.company_name}</h1>
                        <p className="text-primary font-bold uppercase text-sm tracking-widest mb-6">
                            {company.industry}
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <MapPin className="w-5 h-5 text-primary" />
                                <span>{company.city}, {company.province}</span>
                            </div>
                            <div className="flex items-center gap-3 text-muted-foreground">
                                <Building2 className="w-5 h-5 text-primary" />
                                <span>{company.company_type}</span>
                            </div>
                            {company.website && (
                                <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-primary hover:underline">
                                    <Globe className="w-5 h-5" />
                                    <span className="truncate">{company.website.replace(/^https?:\/\//, '')}</span>
                                </a>
                            )}
                        </div>

                        <div className="pt-8 border-t border-white/10 space-y-4">
                            <h3 className="font-bold mb-4">Contatti Diretti</h3>
                            <div className="flex items-center gap-3 text-sm">
                                <Phone className="w-4 h-4 text-primary" />
                                <span>{company.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="w-4 h-4 text-primary" />
                                <span className="truncate">{company.pec_email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* About Section */}
                    <section className="glass rounded-[3rem] p-10 md:p-14 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                        
                        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                            </span>
                            Profilo Aziendale
                        </h2>
                        
                        <div className="prose prose-invert max-w-none">
                            <p className="text-xl leading-relaxed text-foreground/90 whitespace-pre-wrap">
                                {company.description || "Nessuna descrizione disponibile per questa azienda."}
                            </p>
                        </div>
                    </section>

                    {/* Technical Details Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="glass rounded-3xl p-8">
                            <h3 className="text-muted-foreground text-sm font-bold uppercase tracking-wider mb-2">Settore</h3>
                            <p className="text-xl font-bold">{company.industry}</p>
                        </div>
                        <div className="glass rounded-3xl p-8">
                            <h3 className="text-muted-foreground text-sm font-bold uppercase tracking-wider mb-2">Referente</h3>
                            <p className="text-xl font-bold">{company.referent_role}</p>
                        </div>
                        <div className="glass rounded-3xl p-8">
                            <h3 className="text-muted-foreground text-sm font-bold uppercase tracking-wider mb-2">Sede Principale</h3>
                            <p className="text-xl font-bold">{company.address}, {company.address_number}</p>
                            <p className="text-muted-foreground">{company.zip_code} {company.city} ({company.province})</p>
                        </div>
                        <div className="glass rounded-3xl p-8 border-primary/20 bg-primary/5">
                            <h3 className="text-primary text-sm font-bold uppercase tracking-wider mb-2">Status AI</h3>
                            <p className="text-xl font-bold">
                                {company.is_ai_provider ? "Provider di Soluzioni AI" : "Alla ricerca di Soluzioni AI"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
