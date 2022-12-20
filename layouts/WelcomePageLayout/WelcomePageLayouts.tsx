import { Grid, SxProps } from "@mui/material";
import { LoadingSpinner, SideBar } from "common/components";
import { BaseLayout } from "layouts/BaseLayout";
import { ReactNode } from "react";
import { signOut, useSession } from "next-auth/react";
import { RoutesDefinition } from "common/routes";
import { useUserAuth } from "common/hooks";

interface WelcomePageLayoutProps {
  children?: ReactNode;
  sx?: SxProps;
}

export const WelcomePageLayout = ({ children, sx }: WelcomePageLayoutProps) => {
  const { status } = useSession();
  useUserAuth();
  const handleGoogleSignOut = () => {
    signOut({ callbackUrl: RoutesDefinition.login });
  };
  return (
    <>
      {status === "loading" || status === "unauthenticated" ? (
        <LoadingSpinner />
      ) : (
        <BaseLayout sx={{ display: "flex", backgroundColor: "#f2f2f4", ...sx }}>
          <SideBar handleClick={handleGoogleSignOut} />
          <Grid sx={{ width: "80%" }}>{children}</Grid>
        </BaseLayout>
      )}
    </>
  );
};
