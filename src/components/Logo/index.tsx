import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  imagePath: string;
  width: number;
  height: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ imagePath, height, width, className }) => {
  return (
    <Link href="/">
      <Image
        src={imagePath}
        alt="Logo"
        width={width}
        height={height}
        className={className}
      />
    </Link>
  );
};

export default Logo;
