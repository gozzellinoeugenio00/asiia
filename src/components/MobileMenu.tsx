'use client';

import { Drawer } from 'vaul';
import { Menu, X, UserCircle, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface MobileMenuProps {
    user: any;
    logoutAction: () => Promise<void>;
}

export default function MobileMenu({ user, logoutAction }: MobileMenuProps) {
    const [open, setOpen] = useState(false);

    const navLinks = [
        { href: '/about', label: 'Chi Siamo' },
        { href: '/companies', label: 'Aziende' },
        { href: '/professionals', label: 'Privati' },
        { href: '/news', label: 'News' },
        { href: '/annunci', label: 'Annunci' },
    ];

    return (
        <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
            <Drawer.Trigger asChild>
                <button className="md:hidden p-2 text-foreground hover:bg-white/5 rounded-xl transition-colors">
                    <Menu className="w-6 h-6" />
                </button>
            </Drawer.Trigger>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60" />
                <Drawer.Content
                    className="bg-background border-l border-white/10 flex flex-col rounded-l-[32px] h-full w-[300px] fixed bottom-0 right-0 z-70 shadow-2xl outline-none"
                    style={{ height: '100dvh' }}
                >
                    <Drawer.Title></Drawer.Title>
                    <Drawer.Description></Drawer.Description>
                    <div className="flex-1 overflow-y-auto p-6 flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex flex-row items-center gap-1">
                                <DotLottieReact
                                    src="https://lottie.host/db4feeb4-33ba-40ad-8310-125464c23f13/MvnDLjkWkj.lottie"
                                    loop
                                    autoplay
                                    className="w-12 h-12"
                                />
                                <span className="font-bold text-xl gradient-text">ASIIA</span>
                            </div>
                            <Drawer.Close asChild>
                                <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </Drawer.Close>
                        </div>

                        <nav className="space-y-4 flex flex-col">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className="text-lg font-semibold py-3 border-b border-white/5 hover:text-primary transition-colors flex items-center justify-between group"
                                >
                                    {link.label}
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-auto pt-8 border-t border-white/10 space-y-4">
                            {user ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setOpen(false)}
                                        className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all font-medium"
                                    >
                                        <UserCircle className="w-6 h-6 text-primary" />
                                        <span>
                                            {user.user_metadata?.first_name || "Mio Profilo"}
                                        </span>
                                    </Link>
                                    <form action={() => {
                                        logoutAction();
                                        setOpen(false);
                                    }}>
                                        <button
                                            type="submit"
                                            className="w-full flex items-center gap-3 p-4 rounded-2xl text-destructive hover:bg-destructive/5 transition-all font-medium"
                                        >
                                            <LogOut className="w-6 h-6" />
                                            <span>Disconnetti</span>
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <Link
                                        href="/login"
                                        onClick={() => setOpen(false)}
                                        className="flex items-center justify-center p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all font-bold"
                                    >
                                        Accedi
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={() => setOpen(false)}
                                        className="flex items-center justify-center p-4 rounded-2xl bg-primary text-primary-foreground hover:opacity-90 transition-all font-bold"
                                    >
                                        Iscriviti
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
}
