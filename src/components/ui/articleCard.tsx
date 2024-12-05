import Image from "next/image";

interface ArticleCardProps {
  imagePath: string;
  title: string;
  description: string;
}

const ArticleCard = ({ imagePath, title, description }: ArticleCardProps) => {
  return (
    <div className="flex gap-4">
      <Image
        src={imagePath}
        alt={title}
        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md"
        width={250}
        height={216}
      />

      <div>
        <h2 className="font-bold text-lg sm:text-xl text-black">{title}</h2>
        <p className="text-sm sm:text-base text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
