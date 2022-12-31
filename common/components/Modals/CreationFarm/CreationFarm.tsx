import dynamic from "next/dynamic";
import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { GlobalModal } from "common/components/Modals/GlobalModal";
import { creationFormResolver } from "./FarmConfigurationForms/formResolver";
import { LoadingSpinner, ProgressBar } from "common/components";
import { farmProgressBar } from "common/constants";
import { CancelButton, SubmitButton } from "common/components/Form";
import {
  selectFarmState,
  selectProgressBarStepOrder,
  closeModal,
  reset,
  resetConfigurationFarm,
} from "redux/reducers";
import { useCreateFarmMutation } from "redux/api/v1/farm";

const MapModal = dynamic(
  () =>
    import("common/components/Modals/MapModal/MapModal").then(
      (item) => item.MapModal
    ),
  { ssr: false, loading: () => <LoadingSpinner />}
);

export const CreationFarm = () => {
  const step = useAppSelector(selectProgressBarStepOrder);
  const [isSelectionByMapChoice, setIsSelectionByMapChoice] = useState<boolean>(false);
  const farmConfiguration = useAppSelector(selectFarmState);
  const dispatch = useAppDispatch();
  const [createNewFarm] = useCreateFarmMutation();

  const closeCreationModal = () => {
    dispatch(closeModal());
    dispatch(reset());
    dispatch(resetConfigurationFarm());
  };

  const handleSubmit = async () => {
    await createNewFarm(farmConfiguration);
    closeCreationModal();
  };

  return (
    <GlobalModal handleClose={closeCreationModal}>
      {isSelectionByMapChoice && (
        <MapModal setIsSelectionByMap={setIsSelectionByMapChoice} />
      )}
      <Typography variant="h3" fontWeight="700" sx={{ color: "common.black" }}>
        Create farm
      </Typography>
      <ProgressBar activeStep={step} steps={farmProgressBar} />
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          maxWidth: 650,
          margin: "auto",
          height: `calc(100% - ${220}px)`,
        }}
      >
        {creationFormResolver(
          step,
          "solarPanelsConfiguration",
          setIsSelectionByMapChoice
        )}
      </Grid>
      <Grid
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          backgroundColor: "#F2F2F4",
          position: "absolute",
          height: "15%",
          width: "100%",
          bottom: 0,
          left: 0,
          right: 0,
          borderBottomLeftRadius: "2rem",
          borderBottomRightRadius: "2rem",
          p: "2rem",
        }}
      >
        <CancelButton
          handleClick={closeCreationModal}
          label="Remove"
          sx={{ width: "20%" }}
        />
        {farmProgressBar.length - 1 !== step ? (
          <SubmitButton
            label="Next"
            formId="solarPanelsConfiguration"
            sx={{ width: "15%", py: 1 }}
          />
        ) : (
          <SubmitButton
            label="Submit"
            handleClick={handleSubmit}
            sx={{ width: "15%", py: 1 }}
          />
        )}
      </Grid>
    </GlobalModal>
  );
};
