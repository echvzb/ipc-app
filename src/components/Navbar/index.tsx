import { type FC } from "react";
import Burguer from "./Burger";
import NavbarBrand from "./NavbarBrand";
import NavbarLinks from "./NavbarLinks";

const Navbar: FC = () => (
  <header className="z-50 flex w-full flex-wrap bg-slate-900 py-4 text-sm shadow sm:flex-nowrap sm:justify-start">
    <nav
      className="mx-auto w-full max-w-[85rem] px-4 sm:flex sm:items-center sm:justify-between"
      aria-label="Global"
    >
      <div className="flex items-center justify-between">
        <NavbarBrand />
        <Burguer />
      </div>
      <NavbarLinks />
    </nav>
  </header>
);

export default Navbar;
