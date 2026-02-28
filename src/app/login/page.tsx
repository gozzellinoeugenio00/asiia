import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { login } from '@/app/auth/actions';

export default async function LoginPage(props: { searchParams: Promise<{ error?: string; message?: string }> }) {
    const searchParams = await props.searchParams;
    const isError = searchParams?.error === 'true';
    const errorMessage = searchParams?.message || 'Si è verificato un errore durante l\'accesso.';

    return (
        <div className="flex-1 flex items-center justify-center py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-background z-0" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full z-0" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full z-0" />

            <div className="glass p-10 md:p-14 rounded-3xl w-full max-w-md relative z-10 mx-4 border border-white/10 shadow-2xl animate-float-delay">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Torna alla Home
                </Link>

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold mb-2 tracking-tight">Accedi ad <span className="gradient-text">ASIIA</span></h1>
                    <p className="text-muted-foreground">Inserisci le tue credenziali per continuare</p>
                </div>

                {isError && (
                    <div className="mb-6 bg-destructive/10 border border-destructive/50 text-destructive-foreground p-4 rounded-xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-destructive">{errorMessage}</p>
                    </div>
                )}

                <form className="space-y-6" action={login}>
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
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium" htmlFor="password">Password</label>
                            <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                                Password dimenticata?
                            </Link>
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground font-bold py-3.5 px-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_0_20px_rgba(var(--primary),0.3)] mt-2"
                    >
                        Accedi
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-muted-foreground">
                    Non hai un account?{' '}
                    <Link href="/register" className="text-primary font-bold hover:underline">
                        Iscriviti ora
                    </Link>
                </div>
            </div>
        </div>
    );
}
