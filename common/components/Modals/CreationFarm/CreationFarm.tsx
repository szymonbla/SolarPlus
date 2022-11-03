import { Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { closeModal } from "redux/reducers";

import { GlobalModal } from "common/components/Modals/GlobalModal";
import { CancelButton, SubmitButton } from "common/components/Form";
import { creationFormResolver } from "./FarmConfigurationForms/formResolver";
import { nextStep, selectProgressBarStepOrder } from "redux/reducers";
import { ProgressBar } from "common/components";
import { farmProgressBar } from "common/constants";
import { selectFarmState } from "redux/reducers";

export const CreationFarm = () => {
  const step = useAppSelector(selectProgressBarStepOrder);
  const farmConfiguration = useAppSelector(selectFarmState);
  const dispatch = useAppDispatch();

  const closeCreationModal = () => {
    dispatch(closeModal());
  };

  const handleSubmit = () => {
    console.log("Submit", farmConfiguration);
  };

  return (
    <GlobalModal handleClose={closeCreationModal}>
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
        {creationFormResolver(step, "solarPanelsConfiguration")}
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
        <SubmitButton
          label={farmProgressBar.length - 1 === step ? "Submit" : "Next"}
          formId="solarPanelsConfiguration"
          sx={{ width: "15%", py: 1 }}
        />
      </Grid>
    </GlobalModal>
  );
};
