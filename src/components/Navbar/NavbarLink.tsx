import Link from "next/link";
import type { FC } from "react";

interface NavbarLinkProps {
  href: string;
  children: string;
}

const NavbarLink: FC<NavbarLinkProps> = ({ href, children }) => (
  <Link className="font-medium text-gray-400 hover:text-gray-100" href={href}>
    {children}
  </Link>
);

export default NavbarLink;
