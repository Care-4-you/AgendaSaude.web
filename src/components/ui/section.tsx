// components/Section.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Link {
  label: React.ReactNode;
  href: string;
}
interface SectionProps {
  title: string;
  description: React.ReactNode;
  imageSrc: string;
  links: Link[];
  children?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({
  title,
  description,
  imageSrc,
  links,
  children
}) => {
  return (
    <section className="container my-8">
      <div className="flex items-start">
        <div className="mr-20">
          <Image
            src={imageSrc}
            alt={title}
            className="h-full w-full"
            width={300}
            height={300}
          />
        </div>
        <div>
          <h2 className="text-black-800 pb-8 font-mono text-3xl font-bold sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="text-black-600 mb-10 font-mono text-xl font-medium">
            {description}
            <span className="flex flex-row">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  className="mr-10 mt-4 pt-5 hover:text-blue-500"
                >
                  {link.label}
                </a>
              ))}
            </span>
          </p>
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </section>
  );
};

export default Section;
