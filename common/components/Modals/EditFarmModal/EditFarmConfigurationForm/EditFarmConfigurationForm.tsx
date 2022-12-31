import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormInputField } from "common/components/Form";
import { solarFarmInputs, SolarFarmInputsData } from "../../farmformTypes";
import { FarmModelI } from "types";
import { LoadingSpinner } from "common/components/Loading";
import { ButtonWithIcon } from "common/components/Shared";
import SelectLocalization from "common/images/selectLocalization.svg";
import { LatLng } from "leaflet";

const MapModal = dynamic(
  () =>
    import("common/components/Modals/MapModal/MapModal").then(
      (item) => item.MapModal
    ),
  { ssr: false, loading: () => <LoadingSpinner /> }
);
interface EditFarmConfigurationFormProps {
  handleSubmit: SubmitHandler<SolarFarmInputsData>;
  solarFarm?: FarmModelI;
}

export const EditFarmConfigurationForm = ({
  solarFarm,
  handleSubmit,
}: EditFarmConfigurationFormProps) => {
  const [isSelectionByMapChoice, setIsSelectionByMapChoice] =
    useState<boolean>(false);

  const formMethods = useForm<SolarFarmInputsData>({
    mode: "onChange",
    resolver: zodResolver(solarFarmInputs),
    defaultValues: {
      loss: 0,
      peakPower: 0,
      farmName: "",
      latitude: 0,
      longitude: 0,
    },
    reValidateMode: "onChange",
  });

  const openMap = () => {
    setIsSelectionByMapChoice(true);
  };

  const registerLocationChange = (latLangUserChoice: LatLng | undefined) => {
    if (latLangUserChoice) {
      formMethods.setValue("latitude", latLangUserChoice?.lat);
      formMethods.setValue("longitude", latLangUserChoice?.lng);
    }
  };

  useEffect(() => {
    if (solarFarm) {
      const { farmName, location, pvPanel } = solarFarm;
      formMethods.setValue("loss", pvPanel?.loss);
      formMethods.setValue("peakPower", pvPanel?.peakPower);
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
            <Grid display="flex" alignItems="center" gap={1}>
              <Typography variant="h5" fontWeight="600" color="common.black">
                Localization
              </Typography>
              <ButtonWithIcon
                label=""
                icon={SelectLocalization}
                handleClick={openMap}
                isStartIcon={false}
                sx={{
                  backgroundColor: "common.white",
                  "&:hover": { backgroundColor: "common.white" },
                }}
              />
              {isSelectionByMapChoice && (
                <MapModal
                  setIsSelectionByMap={setIsSelectionByMapChoice}
                  handleLogic={registerLocationChange}
                />
              )}
            </Grid>
            <Grid display="flex" gap={2}>
              <FormInputField label="Latitude" name="latitude" type="number" />
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
