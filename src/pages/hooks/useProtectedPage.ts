import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export const useProtectedPage = (): void => {
  const { status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      void signIn();
    }
  }, [status]);
};
