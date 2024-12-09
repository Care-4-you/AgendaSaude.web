"use Client";
import Image from "next/image";
import React from "react";
import { BackButton } from "./buttonBack";

interface BackgroundImageProps {
  src: string;
  alt?: string;
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({
  src,
  alt
}) => {
  return (
    <div
      className="w-full h-[700px] absolute -z-10 bg-cover"
      style={{ backgroundImage: `url(${src})` }}
    >
      <BackButton />
      <Image
        src={src}
        alt={alt || "Imagem de fundo"}
        className="object-cover w-full h-full"
        fill
        priority
      />
    </div>
  );
};
