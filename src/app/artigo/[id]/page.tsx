"use client";
import Image, { StaticImageData } from "next/image";

import { default as LayoutContainer } from "@/components/layout/container";

import { mockArticles } from "../_utils/data";

type Params = {
  params: {
    id: string;
  };
};

interface ArticlesProps {
  id: string;
  title: string;
  content: string[];
  listItems: string[];
  contentTwo: string;
  src: StaticImageData;
}

export default function ArticlePage({ params }: Params) {
  const { id } = params;
  const articles = mockArticles.find(
    (article) => article.id === id
  ) as ArticlesProps;

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between bg-agenda-saude-blue-100">
      <div className="relative w-full overflow-hidden">
        <div className="relative h-[740px] w-full">
          <Image
            src={articles.src}
            alt={"Imagem de fundo"}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="z-50 -mt-[100px] mb-8 flex items-center justify-center px-8">
        <LayoutContainer>
          {articles && (
            <div className="flex w-full flex-col items-start justify-between gap-4 rounded-3xl bg-agenda-saude-purple-200 p-10">
              <h1 className="max-w-max rounded-full bg-[#4AA9AF] bg-opacity-70 px-8 py-2 font-museo font-medium text-white sm:text-lg lg:text-xl xl:text-2xl">
                {articles.title}
              </h1>

              {articles.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-poppins text-base font-normal text-white md:text-xl xl:text-2xl"
                >
                  {paragraph}
                </p>
              ))}

              <ol className="list-inside list-decimal space-y-2 font-museo text-base text-white xl:text-xl">
                {articles.listItems.map((item, index) => (
                  <li key={index} className="ml-2">
                    {item}
                  </li>
                ))}
              </ol>

              <p className="font-museo text-base text-white xl:text-xl">
                {articles.contentTwo}
              </p>
            </div>
          )}
        </LayoutContainer>
      </div>
    </main>
  );
}
