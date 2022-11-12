import { ComparatorComponent } from "common/components";
import { WelcomePageLayout } from "layouts";

const DashboardPage = () => {
  return (
    <WelcomePageLayout>
      <ComparatorComponent />
    </WelcomePageLayout>
  );
};
export default DashboardPage;
DashboardPage.auth = true;
