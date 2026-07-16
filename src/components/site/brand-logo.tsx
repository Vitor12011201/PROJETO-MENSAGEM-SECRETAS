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
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative flex size-9 shrink-0 items-center justify-center rounded-2xl bg-pinkHot/10 ring-1 ring-pinkSoft/35 sm:size-10 lg:size-11">
        <Image
          src="/images/logo-nunca-te-disse.png"
          alt=""
          width={1024}
          height={1024}
          priority={priority}
          sizes="(max-width: 640px) 36px, 44px"
          className={cn("h-8 w-8 object-contain sm:h-9 sm:w-9 lg:h-10 lg:w-10", imageClassName)}
        />
      </span>
      <span className={cn("whitespace-nowrap text-[17px] font-black leading-none tracking-normal text-mist sm:text-[20px]", textClassName)}>
        Nunca Te Disse
      </span>
    </span>
  );
}
