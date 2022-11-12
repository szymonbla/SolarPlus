import dynamic from "next/dynamic";
import { Grid } from "@mui/material";

import { WelcomePageLayout } from "layouts";
import { LoadingSpinner } from "common/components";

const MapComponent = dynamic(
  () =>
    import("common/components/Dashboard/MapComponent/MapComponent").then(
      (item) => item.MapComponent
    ),
  { ssr: false, loading: () => <LoadingSpinner /> }
);

const MapPage = () => {
  return (
    <WelcomePageLayout>
      <MapComponent />
    </WelcomePageLayout>
  );
};
export default MapPage;
MapPage.auth = true;
