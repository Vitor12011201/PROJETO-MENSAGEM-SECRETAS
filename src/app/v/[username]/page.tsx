import type { Metadata } from "next";
import { PublicProfile } from "@/features/profiles/PublicProfile";

type PublicProfileParams = Promise<{ username: string }>;

export async function generateMetadata({ params }: { params: PublicProfileParams }): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `Envie uma mensagem secreta para ${username}`,
    description: "Existe algo que você nunca teve coragem de dizer?",
    openGraph: {
      title: `Envie uma mensagem secreta para ${username}`,
      description: "Existe algo que você nunca teve coragem de dizer?"
    }
  };
}

export default async function PublicProfileRoute({ params }: { params: PublicProfileParams }) {
  const { username } = await params;
  return <PublicProfile username={username} />;
}
