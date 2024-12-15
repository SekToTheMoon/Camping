import Link from "next/link";
import { Button } from "../ui/button";
import Image from "next/image";

const Logo = () => {
  return (
    <Link href="/" className="text-2xl">
      <Image
        className="rounded-full"
        src="/logodesign.png"
        alt="logo"
        width={50}
        height={50}
      />
    </Link>
  );
};
export default Logo;
