'use client';

import { useState } from 'react';
import { User, Building2, AlertCircle } from 'lucide-react';
import { signup } from '@/app/auth/actions';

export function RegisterForm({ error, message }: { error: boolean, message: string }) {
    const [role, setRole] = useState<'professional' | 'company'>('professional');

    return (
        <>
            <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                    type="button"
                    onClick={() => setRole('professional')}
                    className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all ${role === 'professional' ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 text-muted-foreground hover:border-white/30 hover:bg-white/5'}`}
                >
                    <User className="w-8 h-8" />
                    <span className="font-bold">Professionista</span>
                </button>

                <button
                    type="button"
                    onClick={() => setRole('company')}
                    className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all ${role === 'company' ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 text-muted-foreground hover:border-white/30 hover:bg-white/5'}`}
                >
                    <Building2 className="w-8 h-8" />
                    <span className="font-bold">Azienda</span>
                </button>
            </div>

            {error && (
                <div className="mb-6 bg-destructive/10 border border-destructive/50 text-destructive-foreground p-4 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-destructive">{message}</p>
                </div>
            )}

            <form className="space-y-6" action={signup}>
                <input type="hidden" name="role" value={role} />

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="first_name">Nome</label>
                        <input id="first_name" name="first_name" type="text" required placeholder="Mario" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="last_name">Cognome</label>
                        <input id="last_name" name="last_name" type="text" required placeholder="Rossi" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="email">Email {role === 'company' && '(Email diretta referente / Login)'}</label>
                    <input id="email" name="email" type="email" required placeholder="tuonome@esempio.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" required placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                    <p className="text-xs text-muted-foreground mt-1">Minimo 8 caratteri, almeno una lettera maiuscola e un numero.</p>
                </div>

                {role === 'company' && (
                    <div className="mt-8 space-y-6 border-t border-white/10 pt-8">
                        <h3 className="text-lg font-bold gradient-text">1. Dati Aziendali</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="company_name">Ragione Sociale <span className="text-destructive">*</span></label>
                                <input id="company_name" name="company_name" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="vat_number">Partita IVA <span className="text-destructive">*</span></label>
                                <input id="vat_number" name="vat_number" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="tax_code">Codice Fiscale <span className="text-destructive">*</span></label>
                                <input id="tax_code" name="tax_code" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="industry">Settore Merceologico / Ateco <span className="text-destructive">*</span></label>
                                <input id="industry" name="industry" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium" htmlFor="company_type">Tipo di Società <span className="text-destructive">*</span></label>
                                <select id="company_type" name="company_type" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-foreground">
                                    <option value="SRL">S.R.L. / S.R.L.S.</option>
                                    <option value="SPA">S.P.A.</option>
                                    <option value="SNC">S.N.C.</option>
                                    <option value="SAS">S.A.S.</option>
                                    <option value="Ditta Individuale">Ditta Individuale</option>
                                    <option value="Altro">Altro</option>
                                </select>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold gradient-text">2. Sede e Contatti</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium" htmlFor="address">Indirizzo Sede Legale <span className="text-destructive">*</span></label>
                                <div className="flex gap-4">
                                    <input id="address" name="address" type="text" placeholder="Via/Piazza" required className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                                    <input id="address_number" name="address_number" type="text" placeholder="Civico" required className="w-24 bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="city">Città <span className="text-destructive">*</span></label>
                                <input id="city" name="city" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                            </div>
                            <div className="space-y-2 flex gap-4">
                                <div className="flex-1">
                                    <label className="text-sm font-medium" htmlFor="zip_code">CAP <span className="text-destructive">*</span></label>
                                    <input id="zip_code" name="zip_code" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                                </div>
                                <div className="w-24">
                                    <label className="text-sm font-medium" htmlFor="province">Prov. <span className="text-destructive">*</span></label>
                                    <input id="province" name="province" type="text" required placeholder="RM" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium uppercase" maxLength={2} />
                                </div>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium" htmlFor="operating_office">Sede Operativa (Se diversa)</label>
                                <input id="operating_office" name="operating_office" type="text" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="pec_email">Email Aziendale (PEC) <span className="text-destructive">*</span></label>
                                <input id="pec_email" name="pec_email" type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="phone">Telefono/Centralino <span className="text-destructive">*</span></label>
                                <input id="phone" name="phone" type="tel" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium" htmlFor="website">Sito Web</label>
                                <input id="website" name="website" type="url" placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                            </div>
                        </div>

                        <h3 className="text-lg font-bold gradient-text">3. Fatturazione Elettronica</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="sdi_code">Codice Destinatario (SDI) <span className="text-destructive">*</span></label>
                                <input id="sdi_code" name="sdi_code" type="text" required maxLength={7} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium uppercase" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="billing_pec">PEC Fatturazione (Opzionale)</label>
                                <input id="billing_pec" name="billing_pec" type="email" placeholder="Se diversa dalla PEC aziendale" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                            </div>
                        </div>

                        <h3 className="text-lg font-bold gradient-text">4. Dati Referente</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="referent_role">Ruolo in Azienda <span className="text-destructive">*</span></label>
                                <input id="referent_role" name="referent_role" type="text" required placeholder="Es. CEO, HR, Manager" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium" htmlFor="mobile_phone">Cellulare (Per 2FA)</label>
                                <input id="mobile_phone" name="mobile_phone" type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium" />
                            </div>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground font-bold py-3.5 px-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_0_20px_rgba(var(--primary),0.3)] mt-2"
                >
                    Crea Account {role === 'company' ? 'Aziendale' : ''}
                </button>
            </form>
        </>
    );
}
