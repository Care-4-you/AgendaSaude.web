"use client";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";

import { motion } from "framer-motion";

interface AboutUsCardProps {
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  linkedinUrl: string;
  githubUrl: string;
  isImageRight?: boolean;
  rotation?: number;
}

export default function AboutUsCard({
  name,
  role,
  bio,
  photoUrl,
  linkedinUrl,
  githubUrl,
  isImageRight = false,
  rotation = 0
}: AboutUsCardProps) {
  const content = (
    <div className="relative flex aspect-square min-h-[250px] w-full flex-col items-center justify-center bg-[#FFFACD] p-6 text-center shadow-sm">
      {/* Decorative "tape" effect */}
      <div className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 bg-white/40 backdrop-blur-sm" />

      <span className="mb-2 font-poppins text-xs font-bold uppercase text-agenda-saude-purple-100 md:text-sm">
        {role}: {name}
      </span>
      <p className="mb-4 font-poppins text-[11px] font-medium italic leading-relaxed text-gray-800 md:text-[13px]">
        &quot;{bio}&quot;
      </p>
      <div className="flex gap-4">
        <Link
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-agenda-saude-purple-100 transition-colors hover:text-agenda-saude-purple-200"
        >
          <BsLinkedin size={24} />
        </Link>
        <Link
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-agenda-saude-purple-100 transition-colors hover:text-agenda-saude-purple-200"
        >
          <BsGithub size={24} />
        </Link>
      </div>
    </div>
  );

  const image = (
    <div className="relative h-full w-full overflow-hidden shadow-sm">
      <Image
        src={photoUrl}
        alt={name}
        fill
        className="object-cover object-center"
      />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true }}
      whileHover={{
        y: -10,
        scale: 1.02,
        rotate: 0,
        zIndex: 10,
        transition: { duration: 0.2 }
      }}
      className="grid grid-cols-2 overflow-hidden rounded-sm shadow-md transition-shadow hover:shadow-2xl"
    >
      {isImageRight ? (
        <>
          {content}
          {image}
        </>
      ) : (
        <>
          {image}
          {content}
        </>
      )}
    </motion.div>
  );
}
