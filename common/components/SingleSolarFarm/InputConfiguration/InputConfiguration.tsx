import { useEffect } from "react";

import { Grid } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInputField } from "common/components/Form";
import { DashboardTileLayout } from "common/components/Shared";
import {
  FarmModelI,
  mainFarmConfiguration,
  MainFarmConfigurationData,
} from "types";

interface InputConfigurationProps {
  isReadOnly: boolean;
  farmAttributes: FarmModelI;
}

export const InputConfiguration = ({
  isReadOnly,
  farmAttributes,
}: InputConfigurationProps) => {
  const formMethods = useForm<MainFarmConfigurationData>({
    mode: "onChange",
    resolver: zodResolver(mainFarmConfiguration),
    reValidateMode: "onChange",
  });

  return (
    <DashboardTileLayout sx={{ flex: 1 }}>
      <FormProvider {...formMethods}>
        <form>
          <Grid>
            <FormInputField
              label="Latitude"
              name="latitude"
              type="text"
              valueInReadOnly={farmAttributes.location.latitude}
              readOnly={isReadOnly}
            />
            <FormInputField
              label="Longitude"
              name="longitude"
              type="text"
              valueInReadOnly={farmAttributes.location.longitude}
              readOnly={isReadOnly}
            />
            <FormInputField
              label="Peak power"
              name="peakPower"
              type="number"
              valueInReadOnly={farmAttributes.pvPanel.loss}
              readOnly={isReadOnly}
            />
            <FormInputField
              label="Loss"
              name="loss"
              type="number"
              valueInReadOnly={farmAttributes.pvPanel.peakPower}
              readOnly={isReadOnly}
            />
          </Grid>
        </form>
      </FormProvider>
    </DashboardTileLayout>
  );
};
