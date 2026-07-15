import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/images/logo-nunca-te-disse.png"
      alt="Nunca Te Disse"
      width={1024}
      height={1024}
      priority={priority}
      sizes="(max-width: 640px) 44px, 52px"
      className={cn("h-11 w-auto max-w-[52px] object-contain sm:h-12", className)}
    />
  );
}
