import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nunca Te Disse",
    template: "%s | Nunca Te Disse"
  },
  description: "Crie sua caixa secreta e receba mensagens consentidas sem exibir a identidade do remetente.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "Nunca Te Disse",
    description: "Descubra o que nunca tiveram coragem de te dizer.",
    type: "website",
    images: ["/og.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Nunca Te Disse",
    description: "Crie sua caixa secreta e receba mensagens positivas e consentidas."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

