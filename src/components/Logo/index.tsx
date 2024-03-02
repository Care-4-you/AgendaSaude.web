import Image from "next/image";
import Link from "next/link";

import PropTypes from "prop-types";

interface LogoProps {
  imagePath: string;
}

const Logo: React.FC<LogoProps> = ({ imagePath }) => {
  return (
    <Link href="/">
      <Image src={imagePath} alt="Logo" />
    </Link>
  );
};

Logo.propTypes = {
  imagePath: PropTypes.string.isRequired
};

export default Logo;
