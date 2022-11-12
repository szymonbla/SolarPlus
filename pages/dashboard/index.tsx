import { Typography } from "@mui/material";
import { WelcomePageLayout } from "layouts";

const DashboardPage = () => {
  return (
    <WelcomePageLayout>
      <Typography>Dashboard</Typography>
    </WelcomePageLayout>
  );
};
export default DashboardPage;
DashboardPage.auth = true;
