import { Grid } from "@mui/material";
import { Sitebar } from "common/components";
import { BaseLayout } from "layouts/BaseLayout";
import { ReactNode } from "react";
import { signOut } from "next-auth/react";
import { RoutesDefinition } from "common/routes";

interface WelcomePageLayoutProps {
  children?: ReactNode;
}

export const WelcomePageLayout = ({ children }: WelcomePageLayoutProps) => {
  const handleGoogleSignOut = () => {
    signOut({ callbackUrl: RoutesDefinition.login });
  };
  return (
    <BaseLayout sx={{ display: "flex", backgroundColor: "common.white" }}>
      <Sitebar handleClick={handleGoogleSignOut} />
      <Grid sx={{ width: "80%" }}>{children}</Grid>
    </BaseLayout>
  );
};
