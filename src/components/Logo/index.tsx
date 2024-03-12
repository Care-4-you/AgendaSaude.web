import Image from "next/image";
import Link from "next/link";

import PropTypes from "prop-types";

interface LogoProps {
  imagePath: string;
}

const Logo: React.FC<LogoProps> = ({ imagePath }) => {
  return (
    <Link href="/">
      <img
        src={imagePath}
        alt="Logo"
        className="w-12 bg-slate-200 rounded-full"
      />
    </Link>
  );
};

Logo.propTypes = {
  imagePath: PropTypes.string.isRequired
};

export default Logo;
