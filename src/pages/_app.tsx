import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { useEffect } from "react";
import Navbar from "./components/Navbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  useEffect(() => {
    import("preline");
  }, []);

  return (
    <>
      <Head>
        <title>IPC app</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Navbar />
        <div className="container mx-auto py-10">
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
