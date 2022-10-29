import { signOut } from "next-auth/react";

import { BaseLayout } from "layouts";
import { RoutesDefinition } from "common/routes";
import { LoadingSpinner, Sitebar } from "common/components";
import dynamic from "next/dynamic";
import { Grid } from "@mui/material";
const MapComponent = dynamic(
  () =>
    import("common/components/Dashboard/MapComponent/MapComponent").then(
      (item) => item.MapComponent
    ),
  { ssr: false, loading: () => <LoadingSpinner /> }
);

const DashboardPage = () => {
  const handleGoogleSignOut = () => {
    signOut({ callbackUrl: RoutesDefinition.login });
  };
  return (
    <BaseLayout sx={{ display: "flex", backgroundColor: "common.white" }}>
      <Sitebar handleClick={handleGoogleSignOut} />
      <Grid sx={{ width: "80%" }}>
        <MapComponent />
      </Grid>
    </BaseLayout>
  );
};
export default DashboardPage;
DashboardPage.auth = true;
