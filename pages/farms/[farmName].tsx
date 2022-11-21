import { Typography } from "@mui/material";

import { WelcomePageLayout } from "layouts";
import { SingleSolarFarm } from "common/components";
const SingleFarmPage = () => {
  return (
    <WelcomePageLayout sx={{ backgroundColor: "#f2f2f4" }}>
      <SingleSolarFarm />
    </WelcomePageLayout>
  );
};

SingleFarmPage.auth = true;
export default SingleFarmPage;
