import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { UserCircle, LogOut } from 'lucide-react';
import { logout } from '@/app/auth/actions';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ASIIA - Associazione Sviluppo Imprese e Intelligenza Artificiale',
  description: 'Mettiamo in contatto la realtà dei professionisti di intelligenza artificiale, le aziende e molto altro.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="it" className="dark">
      <body className={`${inter.className} min-h-screen bg-background text-foreground flex flex-col`}>
        <header className="sticky top-0 z-50 w-full border-b border-white/10 glass">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="font-bold text-2xl tracking-tight gradient-text">
              ASIIA
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/news" className="text-sm font-medium hover:text-primary transition-colors">News</Link>
              <Link href="/annunci" className="text-sm font-medium hover:text-primary transition-colors">Annunci</Link>
              <Link href="/professionals" className="text-sm font-medium hover:text-primary transition-colors">Professionisti</Link>
              <Link href="/companies" className="text-sm font-medium hover:text-primary transition-colors">Aziende</Link>
              <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">Chi Siamo</Link>
            </nav>
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                    <UserCircle className="w-5 h-5" />
                    <span>{user.user_metadata?.first_name ? user.user_metadata.first_name : 'Profilo'}</span>
                  </Link>
                  <form action={logout}>
                    <button type="submit" className="flex items-center gap-2 text-sm font-medium text-destructive hover:text-destructive/80 transition-colors">
                      <LogOut className="w-5 h-5" />
                      <span className="hidden sm:inline">Esci</span>
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">Accedi</Link>
                  <Link href="/register" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors">
                    Iscriviti
                  </Link>
                </>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <footer className="border-t border-white/10 glass py-8">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ASIIA. Tutti i diritti riservati.
          </div>
        </footer>
      </body>
    </html>
  );
}
