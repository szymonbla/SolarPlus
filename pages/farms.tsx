import { WelcomePageLayout } from "layouts";
import { CreationFarm, FarmsComponent } from "common/components";

const FarmsPage = () => {
  return (
    <WelcomePageLayout>
      <CreationFarm />
      <FarmsComponent />
    </WelcomePageLayout>
  );
};
export default FarmsPage;
FarmsPage.auth = true;
