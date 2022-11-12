import { DashboardComponent } from "common/components";
import { WelcomePageLayout } from "layouts";

const DashboardPage = () => {
  return (
    <WelcomePageLayout>
      <DashboardComponent />
    </WelcomePageLayout>
  );
};
export default DashboardPage;
DashboardPage.auth = true;
