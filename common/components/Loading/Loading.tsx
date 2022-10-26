import Image from "next/image";

import { BaseLayout } from "layouts";
import LoadingSVG from "public/images/loading.svg";

export const LoadingSpinner = () => {
  return (
    <BaseLayout
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Image src={LoadingSVG} width={200} height={200} alt="Loading" />
    </BaseLayout>
  );
};
