import type { FC } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import NavbarLink from "./NavbarLink";

const NavbarLinks: FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div
      id="navbar-collapse-with-animation"
      className="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 sm:block"
    >
      <div className="mt-5 flex flex-col gap-5 sm:mt-0 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-5 sm:flex-row sm:pl-5">
          <NavbarLink href="/graph">Gráfica</NavbarLink>
          <NavbarLink href="/config">Configuración</NavbarLink>
        </div>
        {sessionData ? (
          <div className="group block flex-shrink-0">
            <div className="flex items-center">
              {sessionData.user.image ? (
                <Image
                  className="inline-block h-[3.875rem] w-[3.875rem] flex-shrink-0 rounded-full"
                  width={500}
                  height={500}
                  src={sessionData.user.image}
                  alt="Image Description"
                />
              ) : null}

              <div className="ml-3">
                <h3 className="text-sm font-semibold text-gray-400">
                  {sessionData.user.name}
                </h3>
                <button
                  className="text-xs font-medium text-gray-500 hover:text-gray-300"
                  onClick={() => void signOut()}
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NavbarLinks;
