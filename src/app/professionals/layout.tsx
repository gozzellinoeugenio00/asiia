import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Esperti e Professionisti AI",
    description: "Connettiti con i migliori esperti di Intelligenza Artificiale, Machine Learning e Data Science in Italia.",
};

export default function ProfessionalsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
