import { cn } from "@nextui-org/react";
import Link from "next/link";
import { FcMindMap } from "react-icons/fc";
type LogoProps = {
  className?: string;
};
function Logo({ className }: LogoProps) {
  return (
    <Link href={"/"} className={cn("flex items-center gap-x-2", className)}>
      <FcMindMap />
      <h1 className="font-bold text-default-50 text-xl">Mind Root</h1>
    </Link>
  );
}

export default Logo;
