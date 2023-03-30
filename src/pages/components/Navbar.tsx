import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { type FC } from "react";

const Navbar: FC = () => {
  const { data: sessionData } = useSession();
  return (
    <header className="z-50 flex w-full flex-wrap bg-neutral-100 py-4 text-sm shadow sm:flex-nowrap sm:justify-start">
      <nav
        className="mx-auto w-full max-w-[85rem] px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <a className="flex-none text-xl font-semibold" href="#">
            Índice de Precios y Cotizaciones
          </a>
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle inline-flex items-center justify-center gap-2 rounded-md border bg-neutral-100 p-2 align-middle text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white"
              data-hs-collapse="#navbar-collapse-with-animation"
              aria-controls="navbar-collapse-with-animation"
              aria-label="Toggle navigation"
            >
              <svg
                className="h-4 w-4 hs-collapse-open:hidden"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
              <svg
                className="hidden h-4 w-4 hs-collapse-open:block"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="navbar-collapse-with-animation"
          className="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 sm:block"
        >
          <div className="mt-5 flex flex-col gap-5 sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:pl-5">
            {sessionData ? (
              <div className="group block flex-shrink-0">
                <div className="flex items-center">
                  <Image
                    className="inline-block h-[3.875rem] w-[3.875rem] flex-shrink-0 rounded-full"
                    width={250}
                    height={250}
                    src={sessionData.user.image || ""}
                    alt="Image Description"
                  />
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-800">
                      {sessionData.user.name}
                    </h3>
                    <button
                      className="text-sm font-medium text-gray-500"
                      onClick={() => void signOut()}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {/* <a
              className="font-medium text-blue-500"
              href="#"
              aria-current="page"
            >
              Landing
            </a>
            <a
              className="font-medium text-gray-600 hover:text-gray-400"
              href="#"
            >
              Account
            </a>
            <a
              className="font-medium text-gray-600 hover:text-gray-400"
              href="#"
            >
              Work
            </a>
            <a
              className="font-medium text-gray-600 hover:text-gray-400"
              href="#"
            >
              Blog
            </a> */}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
