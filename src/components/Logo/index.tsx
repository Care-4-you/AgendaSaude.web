import Link from "next/link";

export default function Logo({ imagePath }) {
  return (
    <Link href="/">
      <img src={imagePath} alt="Logo" />
    </Link>
  );
}
