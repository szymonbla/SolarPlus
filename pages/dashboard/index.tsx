import { CreationFarm, DashboardComponent } from "common/components";
import { WelcomePageLayout } from "layouts";

const DashboardPage = () => {
  return (
    <WelcomePageLayout sx={{ backgroundColor: "#f2f2f4" }}>
      <CreationFarm />
      <DashboardComponent />
    </WelcomePageLayout>
  );
};
export default DashboardPage;
DashboardPage.auth = true;
