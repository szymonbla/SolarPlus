import { Grid, SxProps } from "@mui/material";
import { SideBar } from "common/components";
import { BaseLayout } from "layouts/BaseLayout";
import { ReactNode } from "react";
import { signOut } from "next-auth/react";
import { RoutesDefinition } from "common/routes";

interface WelcomePageLayoutProps {
  children?: ReactNode;
  sx?: SxProps;
}

export const WelcomePageLayout = ({ children, sx }: WelcomePageLayoutProps) => {
  const handleGoogleSignOut = () => {
    signOut({ callbackUrl: RoutesDefinition.login });
  };
  return (
    <BaseLayout sx={{ display: "flex", backgroundColor: "#f2f2f4", ...sx }}>
      <SideBar handleClick={handleGoogleSignOut} />
      <Grid sx={{ width: "80%" }}>{children}</Grid>
    </BaseLayout>
  );
};
