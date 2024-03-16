import Image from "next/image";
import Link from "next/link";

import PropTypes from "prop-types";

interface LogoProps {
  imagePath: string;
}

const Logo: React.FC<LogoProps> = ({ imagePath }) => {
  return (
    <Link href="/">
      <Image
        src={imagePath}
        alt="Logo"
        className="w-12 bg-slate-200 rounded-full"
        width={48}
        height={48}
      />
    </Link>
  );
};

Logo.propTypes = {
  imagePath: PropTypes.string.isRequired
};

export default Logo;
