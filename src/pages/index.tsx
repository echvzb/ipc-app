import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useProtectedPage } from "../hooks/useProtectedPage";

const Home: NextPage = () => {
  const { status } = useProtectedPage();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      void router.push("/graph");
    }
  }, [status, router]);

  return <></>;
};

export default Home;
