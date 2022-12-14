import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormInputField } from "common/components/Form";
import { solarFarmInputs, SolarFarmInputsData } from "../../farmformTypes";
import { FarmModelI } from "types";
interface EditFarmConfigurationFormProps {
  handleSubmit: SubmitHandler<SolarFarmInputsData>;
  solarFarm?: FarmModelI;
}

export const EditFarmConfigurationForm = ({
  solarFarm,
  handleSubmit,
}: EditFarmConfigurationFormProps) => {
  const formMethods = useForm<SolarFarmInputsData>({
    mode: "onChange",
    resolver: zodResolver(solarFarmInputs),
    defaultValues: {
      loss: "",
      peakPower: "",
      farmName: "",
      latitude: "",
      longitude: "",
    },
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (solarFarm) {
      const { farmName, location, pvPanel } = solarFarm;
      formMethods.setValue("loss", String(pvPanel?.loss));
      formMethods.setValue("peakPower", String(pvPanel?.peakPower));
      formMethods.setValue("farmName", farmName);
      formMethods.setValue("longitude", location.longitude);
      formMethods.setValue("latitude", location.latitude);
    }
  }, [formMethods, solarFarm]);

  return (
    <Grid sx={{ width: "100%" }}>
      <FormProvider {...formMethods}>
        <form
          id="editFarmForm"
          onSubmit={formMethods.handleSubmit(handleSubmit)}
        >
          <Grid
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={2}
          >
            <FormInputField
              label="Farm name"
              name="farmName"
              type="text"
              sx={{ width: "100%" }}
            />
            <Typography variant="h5" fontWeight="600" color="common.black">
              Localization
            </Typography>
            <Grid display="flex" gap={2}>
              <FormInputField label="Latitude" name="latitude" type="text" />
              <FormInputField label="Longitude" name="longitude" type="text" />
            </Grid>
            <Typography variant="h5" fontWeight="600" color="common.black">
              Panel attributes
            </Typography>
            <Grid display="flex" gap={2}>
              <FormInputField
                label="Peak power"
                name="peakPower"
                type="number"
              />
              <FormInputField label="Loss" name="loss" type="number" />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Grid>
  );
};
