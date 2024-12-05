import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  imagePath: string;
  width: number;
  height: number;
}

const Logo: React.FC<LogoProps> = ({ imagePath, height, width }) => {
  return (
    <Link href="/">
      <Image src={imagePath} alt="Logo" width={width} height={height} />
    </Link>
  );
};

export default Logo;
