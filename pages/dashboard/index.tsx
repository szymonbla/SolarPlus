import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

import { DashboardLayout } from "layouts/DashboardLayout";
import { RoutesDefinition } from "common/routes";

const DashboardPage = () => {
  const handleGoogleSignOut = () => {
    signOut({ callbackUrl: RoutesDefinition.login });
  };
  return (
    <DashboardLayout>
      <Button onClick={handleGoogleSignOut}>Sign out</Button>
    </DashboardLayout>
  );
};
export default DashboardPage;
