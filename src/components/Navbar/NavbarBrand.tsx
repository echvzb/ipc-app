import Link from "next/link";
import type { FC } from "react";

const NavbarBrand: FC = () => (
  <Link className="flex-none text-xl font-semibold text-neutral-100" href="/">
    IPC APP
  </Link>
);

export default NavbarBrand;
