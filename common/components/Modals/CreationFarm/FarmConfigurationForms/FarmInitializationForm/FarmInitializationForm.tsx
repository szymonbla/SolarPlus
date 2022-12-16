import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  setFarmConfiguration,
  selectFarmState,
  nextStep,
  openModal,
} from "redux/reducers";
import { FormInputField } from "common/components/Form";
import {
  FarmInitializationData,
  farmInitializationSchema,
} from "common/components/Modals/farmformTypes";
import { ButtonWithIcon } from "common/components/Shared";
import SelectLocalization from "common/images/selectLocalization.svg";
interface FarmInitializationFormProps {
  formId: string;
  setIsSelectionByMapChoice: Dispatch<SetStateAction<boolean>>;
}

export const FarmInitializationForm = ({
  formId,
  setIsSelectionByMapChoice,
}: FarmInitializationFormProps) => {
  const dispatch = useAppDispatch();
  const actualState = useAppSelector(selectFarmState);

  const formMethods = useForm<FarmInitializationData>({
    mode: "onChange",
    resolver: zodResolver(farmInitializationSchema),
    defaultValues: {
      farmName: "",
      latitude: "",
      longitude: "",
    },
    reValidateMode: "onChange",
  });

  const handleSubmit = useCallback(
    ({ farmName, latitude, longitude }: FarmInitializationData) => {
      dispatch(
        setFarmConfiguration({
          ...actualState,
          farmName,
          location: {
            latitude: latitude,
            longitude: longitude,
          },
        })
      );
      dispatch(nextStep());
    },
    [actualState, dispatch]
  );

  useEffect(() => {
    formMethods.setValue("latitude", actualState.location.latitude);
    formMethods.setValue("longitude", actualState.location.longitude);
  }, [
    actualState.location.latitude,
    actualState.location.longitude,
    formMethods,
  ]);

  const openMap = () => {
    setIsSelectionByMapChoice(true);
  };

  return (
    <Grid sx={{ width: "100%" }}>
      <FormProvider {...formMethods}>
        <form id={formId} onSubmit={formMethods.handleSubmit(handleSubmit)}>
          <Grid display="flex" flexDirection="column" gap={4}>
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
            </Grid>
            <Grid display="flex" gap={2}>
              <FormInputField label="Latitude" name="latitude" type="text" />
              <FormInputField label="Longitude" name="longitude" type="text" />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Grid>
  );
};
