import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  imagePath: string;
  title: string;
  description: string;
  href: string;
}

const ArticleCard = ({
  imagePath,
  title,
  description,
  href
}: ArticleCardProps) => {
  return (
    <div className="flex gap-4">
      <Link href={href} className="flex-1">
        <Image
          src={imagePath}
          alt={title}
          className="  object-cover rounded-md"
          width={250}
          height={250}
        />
      </Link>

      <div className="flex-[2]">
        <h2 className="font-bold text-lg sm:text-xl text-black">{title}</h2>
        <p className="text-sm sm:text-base text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
