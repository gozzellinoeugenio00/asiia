import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { UserCircle, LogOut } from "lucide-react";
import { logout } from "@/app/auth/actions";
import PhoneButton from "@/components/PhoneButton";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import MobileMenu from "@/components/MobileMenu";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ASIIA - Associazione Sviluppo Imprese e Intelligenza Artificiale",
  description:
    "Mettiamo in contatto la realtà dei professionisti di intelligenza artificiale, le aziende e molto altro.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="it" className={cn("dark", "font-sans", geist.variable)}>
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground flex flex-col`}
      >
        <header className="sticky top-0 z-50 w-full  glass">
          <div className="container mx-auto h-16 flex items-center justify-between">
            <Link
              href="/"
              className="font-bold text-2xl tracking-tight gradient-text"
            >
              <div className="flex flex-row items-center gap-1">
                <DotLottieReact
                  src="https://lottie.host/db4feeb4-33ba-40ad-8310-125464c23f13/MvnDLjkWkj.lottie"
                  loop
                  autoplay
                  className="w-16 h-16"

                />
                <p>ASIIA</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/about"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Chi Siamo
              </Link>
              <Link
                href="/companies"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Aziende
              </Link>

              <Link
                href="/professionals"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Privati
              </Link>
              <Link
                href="/news"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                News
              </Link>
              <Link
                href="/annunci"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Annunci
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-4">
                {user ? (
                  <div className="flex items-center gap-4">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                    >
                      <UserCircle className="w-5 h-5" />
                      <span>
                        {user.user_metadata?.first_name
                          ? user.user_metadata.first_name
                          : "Profilo"}
                      </span>
                    </Link>
                    <form action={logout}>
                      <button
                        type="submit"
                        className="flex items-center gap-2 text-sm font-medium text-destructive hover:text-destructive/80 transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="hidden sm:inline">Esci</span>
                      </button>
                    </form>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      Accedi
                    </Link>
                    <Link
                      href="/register"
                      className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
                    >
                      Iscriviti
                    </Link>
                  </>
                )}
              </div>
              <MobileMenu user={user} logoutAction={logout} />
            </div>
          </div>
        </header>
        <main className="flex-1 flex flex-col">
          {children}
          <PhoneButton />
        </main>
        <footer className="border-t border-white/10 glass pt-16 pb-8 mt-auto">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              {/* Brand Column */}
              <div className="space-y-4">
                <Link
                  href="/"
                  className="font-bold text-2xl tracking-tight gradient-text"
                >
                  ASIIA
                </Link>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  La prima associazione no profit dedicata allo sviluppo e
                  all&apos;integrazione dell&apos;Intelligenza Artificiale, con marchio
                  registrato a livello Europeo. Il ponte tra talento e mercato.
                </p>
              </div>

              {/* Navigation */}
              <div>
                <h4 className="font-bold mb-6">Navigazione</h4>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="/about"
                      className="hover:text-primary transition-colors"
                    >
                      Chi Siamo
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/companies"
                      className="hover:text-primary transition-colors"
                    >
                      Aziende
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/professionals"
                      className="hover:text-primary transition-colors"
                    >
                      Privati
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/news"
                      className="hover:text-primary transition-colors"
                    >
                      News
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/annunci"
                      className="hover:text-primary transition-colors"
                    >
                      Annunci
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Community */}
              <div>
                <h4 className="font-bold mb-6">Community</h4>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="/register"
                      className="hover:text-primary transition-colors"
                    >
                      Entra in ASIIA
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/login"
                      className="hover:text-primary transition-colors"
                    >
                      Accedi
                    </Link>
                  </li>
                  <li>
                    <span className="cursor-default">Professionisti AI</span>
                  </li>
                  <li>
                    <span className="cursor-default">Aziende Innovative</span>
                  </li>
                  <li>
                    <span className="cursor-default">Aggiornamenti PNRR</span>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-bold mb-6">Contatti</h4>
                <ul className="space-y-4 text-sm text-muted-foreground">
                  <li className="flex flex-col gap-1">
                    <span className="font-medium text-foreground text-xs uppercase tracking-wider">
                      Telefono
                    </span>
                    <a
                      href="tel:+393384919351"
                      className="hover:text-primary transition-colors"
                    >
                      +39 338 491 9351
                    </a>
                  </li>
                  <li className="flex flex-col gap-1 pt-2">
                    <span className="font-medium text-foreground text-xs uppercase tracking-wider">
                      Email
                    </span>
                    <a
                      href="mailto:info@asiia.it"
                      className="hover:text-primary transition-colors"
                    >
                      info@asiia.it
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
              <p>
                &copy; {new Date().getFullYear()} ASIIA. Tutti i diritti
                riservati. Marchio registrato EU.
              </p>
              <div className="flex gap-6">
                <Link href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
