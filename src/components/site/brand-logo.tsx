import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  priority?: boolean;
};

export function BrandLogo({ className, imageClassName, textClassName, priority = false }: BrandLogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 sm:gap-2.5", className)}>
      <Image
        src="/images/logo-nunca-te-disse.png"
        alt=""
        width={1024}
        height={1024}
        priority={priority}
        sizes="(max-width: 640px) 44px, 56px"
        className={cn("h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12 lg:h-[52px] lg:w-[52px]", imageClassName)}
      />
      <span className={cn("whitespace-nowrap text-[17px] font-black leading-none tracking-normal text-mist sm:text-[21px]", textClassName)}>
        Nunca Te Disse
      </span>
    </span>
  );
}
