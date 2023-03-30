import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export const useProtectedPage = () => {
  const { status, data } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      void signIn();
    }
  }, [status]);

  return { status, data };
};
