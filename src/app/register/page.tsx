import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { RegisterForm } from '@/components/RegisterForm';

export default async function RegisterPage(props: { searchParams: Promise<{ error?: string; message?: string }> }) {
    const searchParams = await props.searchParams;
    const isError = searchParams?.error === 'true';
    const errorMessage = searchParams?.message || 'Si è verificato un errore durante la registrazione.';

    return (
        <div className="flex-1 flex items-center justify-center py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-background z-0" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full z-0" />
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full z-0" />

            <div className="glass p-10 md:p-14 rounded-3xl w-full max-w-xl relative z-10 mx-4 border border-white/10 shadow-2xl animate-float">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Torna alla Home
                </Link>

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold mb-2 tracking-tight">Unisciti ad <span className="gradient-text">ASIIA</span></h1>
                    <p className="text-muted-foreground">Crea il tuo account per accedere alla community</p>
                </div>

                <RegisterForm error={isError} message={errorMessage} />

                <div className="mt-8 text-center text-sm text-muted-foreground">
                    Hai già un account?{' '}
                    <Link href="/login" className="text-primary font-bold hover:underline">
                        Accedi ora
                    </Link>
                </div>
            </div>
        </div>
    );
}
