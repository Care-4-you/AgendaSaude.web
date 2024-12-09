import Link from "next/link";

import { ChevronLeft } from "lucide-react";

export const BackButton = () => {
  return (
    <div className="absolute top-4 left-4 px-3 py-2 rounded-md shadow transition bg-black/10 hover:bg-white/10 z-20 sm:block hidden">
      <Link href="/">
        <ChevronLeft size={31} color="white" />
      </Link>
    </div>
  );
};
