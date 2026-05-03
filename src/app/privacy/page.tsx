import { Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Privacy Policy | ASIIA',
    description: 'Informativa sul trattamento dei dati personali dell\'associazione ASIIA.',
};

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" /> Torna alla Home
            </Link>

            <div className="glass rounded-[2.5rem] p-8 md:p-12 border-primary/10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                        <Shield className="w-6 h-6" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold">Privacy Policy</h1>
                </div>

                <div className="prose prose-invert max-w-none prose-p:text-muted-foreground prose-headings:text-foreground">
                    <p>
                        Informativa ai sensi dell'art. 13 del Regolamento (UE) 2016/679 (GDPR).
                    </p>

                    <h3>1. Titolare del Trattamento</h3>
                    <p>
                        Il titolare del trattamento dei dati è ASIIA (Associazione per lo Sviluppo e l'Integrazione dell'Intelligenza Artificiale). 
                        Puoi contattarci in qualsiasi momento tramite i canali ufficiali presenti sul sito.
                    </p>

                    <h3>2. Dati Raccolti</h3>
                    <p>
                        Tramite la nostra piattaforma raccogliamo i dati forniti volontariamente dagli utenti in fase di registrazione, tra cui:
                    </p>
                    <ul>
                        <li>Dati anagrafici (Nome, Cognome)</li>
                        <li>Dati di contatto (Email, Numero di telefono)</li>
                        <li>Dati professionali e aziendali (Professione, Competenze, Ragione Sociale, P.IVA)</li>
                    </ul>

                    <h3>3. Finalità del Trattamento</h3>
                    <p>
                        I dati vengono trattati esclusivamente per le seguenti finalità:
                    </p>
                    <ul>
                        <li>Consentire la registrazione e la creazione del profilo sulla piattaforma.</li>
                        <li>Fornire i servizi previsti dall'associazione (matchmaking tra aziende e professionisti).</li>
                        <li>Inviare comunicazioni relative al servizio e agli eventi dell'associazione.</li>
                    </ul>

                    <h3>4. Conservazione e Protezione</h3>
                    <p>
                        I dati sono conservati su server sicuri e trattati con adeguate misure tecniche e organizzative per prevenire accessi non autorizzati.
                        Utilizziamo tecnologie moderne e provider affidabili (come Supabase) per la gestione dell'autenticazione e dei database.
                    </p>

                    <h3>5. Diritti dell'Utente</h3>
                    <p>
                        In conformità al GDPR, hai il diritto di richiedere l'accesso ai tuoi dati, la rettifica, la cancellazione (diritto all'oblio), 
                        la limitazione del trattamento e la portabilità dei dati. Per esercitare questi diritti, puoi contattarci tramite email.
                    </p>
                </div>
            </div>
        </div>
    );
}
