import ArticleCard from "@/components/layout/article-card";
import { default as LayoutContainer } from "@/components/layout/container";

const SectionTwo = () => {
  return (
    <LayoutContainer as="section" className="flex flex-col gap-16 py-16">
      <h2 className="font-museo text-3xl font-bold text-black sm:text-4xl">
        Artigos
      </h2>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ArticleCard />
      </div>
    </LayoutContainer>
  );
};

export default SectionTwo;
