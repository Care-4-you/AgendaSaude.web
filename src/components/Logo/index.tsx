import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  imagePath: string;
  width?: string;
  height?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  imagePath,
  height = "42",
  width = "40",
  className
}) => {
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
