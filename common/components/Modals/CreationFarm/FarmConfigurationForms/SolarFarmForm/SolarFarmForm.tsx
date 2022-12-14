import { useCallback } from "react";
import { Grid } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  setFarmConfiguration,
  nextStep,
  selectFarmState,
} from "redux/reducers";

import { FormInputField } from "common/components/Form";
import {
  SolarPanelConfigurationData,
  solarPanelConfigurationSchema,
} from "common/components/Modals/farmformTypes";

interface SolarFarmFormProps {
  formId: string;
}

export const SolarFarmForm = ({ formId }: SolarFarmFormProps) => {
  const dispatch = useAppDispatch();
  const actualState = useAppSelector(selectFarmState);

  const formMethods = useForm<SolarPanelConfigurationData>({
    mode: "onChange",
    resolver: zodResolver(solarPanelConfigurationSchema),
    defaultValues: {
      peakPower: "",
      loss: "",
    },
    reValidateMode: "onChange",
  });

  const handleSubmit = useCallback(
    ({ loss, peakPower }: SolarPanelConfigurationData) => {
      dispatch(
        setFarmConfiguration({
          ...actualState,
          pvPanel: {
            loss: Number(loss),
            peakPower: Number(peakPower),
          },
        })
      );
      dispatch(nextStep());
    },
    [actualState, dispatch]
  );

  return (
    <Grid sx={{ width: "100%" }}>
      <FormProvider {...formMethods}>
        <form id={formId} onSubmit={formMethods.handleSubmit(handleSubmit)}>
          <Grid display="flex" alignItems="flex-start" gap={2}>
            <FormInputField label="Peak power" name="peakPower" type="number" />
            <FormInputField label="Loss" name="loss" type="number" />
          </Grid>
        </form>
      </FormProvider>
    </Grid>
  );
};
