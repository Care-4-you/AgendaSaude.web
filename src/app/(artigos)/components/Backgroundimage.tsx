"use Client";
import Image from "next/image";
import React from "react";

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
      className="w-full h-[50vh] bg-cover relative"
      style={{ backgroundImage: `url(${src})` }}
    >
      <Image
        src={src}
        alt={alt || "Imagem de fundo"}
        className="object-cover z-1"
        fill
        priority
      />
    </div>
  );
};
