import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

import { BaseLayout } from "layouts";
import { RoutesDefinition } from "common/routes";
import { Sitebar, MapComponent } from "common/components";

const DashboardPage = () => {
  const handleGoogleSignOut = () => {
    signOut({ callbackUrl: RoutesDefinition.login });
  };
  return (
    <BaseLayout sx={{ display: "flex", backgroundColor: "common.white" }}>
      <Sitebar handleClick={handleGoogleSignOut} />
      <MapComponent />
    </BaseLayout>
  );
};
export default DashboardPage;
DashboardPage.auth = true;
