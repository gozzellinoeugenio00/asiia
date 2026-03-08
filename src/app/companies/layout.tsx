import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aziende AI in Italia",
    description: "Esplora le aziende italiane che offrono servizi di Intelligenza Artificiale o cercano talenti e soluzioni innovative.",
};

export default function CompaniesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
