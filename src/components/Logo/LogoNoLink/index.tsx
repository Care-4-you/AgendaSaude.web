import Image from "next/image";

interface LogoProps {
  imagePath: string;
  width: number;
  height: number;
  className?: string;
}

const LogoNoLink: React.FC<LogoProps> = ({
  imagePath,
  height,
  width,
  className
}) => {
  return (
    <Image
      src={imagePath}
      alt="Logo"
      width={width}
      height={height}
      className={className}
    />
  );
};

export default LogoNoLink;
