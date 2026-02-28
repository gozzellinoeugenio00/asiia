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
                        <input
                            id="first_name"
                            name="first_name"
                            type="text"
                            required
                            placeholder="Mario"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="last_name">Cognome</label>
                        <input
                            id="last_name"
                            name="last_name"
                            type="text"
                            required
                            placeholder="Rossi"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="tuonome@esempio.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Minimo 8 caratteri, almeno una lettera maiuscola e un numero.</p>
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground font-bold py-3.5 px-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_0_20px_rgba(var(--primary),0.3)] mt-2"
                >
                    Crea Account
                </button>
            </form>
        </>
    );
}
