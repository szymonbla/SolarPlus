import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { RoutesDefinition } from "common/routes";

export const useUserAuth = () => {
  const { push } = useRouter();
  useSession({
    required: true,
    onUnauthenticated() {
      push(RoutesDefinition.login);
    },
  });
};
