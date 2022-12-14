import { Dispatch, SetStateAction, useEffect } from "react";
import { Grid, Typography } from "@mui/material";

import { useAppDispatch } from "redux/hooks";
import { closeModal } from "redux/reducers";
import { GlobalModal } from "../GlobalModal";
import { EditFarmConfigurationForm } from "./EditFarmConfigurationForm";
import { FarmModelI } from "types";
import { CancelButton, SubmitButton } from "common/components/Form";
import { useUpdateFarmByIdMutation } from "redux/api/v1/farm";
import { ButtonWithIcon } from "common/components/Shared";
import SaveIcon from "common/images/actionBar/save.svg";
import { SolarFarmInputsData } from "../farmformTypes";
import { useForm, useFormContext } from "react-hook-form";

interface EditFarmModal {
  setIsInEditFarm: Dispatch<SetStateAction<boolean>>;
  solarFarm?: FarmModelI;
}

export const EditFarmModal = ({
  solarFarm,
  setIsInEditFarm,
}: EditFarmModal) => {
  const dispatch = useAppDispatch();
  const [updateFarmByIdTrigger] = useUpdateFarmByIdMutation();
  const handleSubmit = async ({
    farmName,
    latitude,
    longitude,
    loss,
    peakPower,
  }: SolarFarmInputsData) => {
    await updateFarmByIdTrigger({
      ...solarFarm,
      farmName,
      location: { latitude, longitude },
      pvPanel: { loss: Number(loss), peakPower: Number(peakPower) },
      id: solarFarm?.id,
    });
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsInEditFarm(false);
    dispatch(closeModal());
  };

  return (
    <GlobalModal handleClose={handleCloseModal}>
      <Typography variant="h3" fontWeight="700" sx={{ color: "common.black" }}>
        Edit farm
      </Typography>
      <Grid
        display="flex"
        alignItems="center"
        sx={{ width: "100%", height: "80%" }}
      >
        <EditFarmConfigurationForm
          handleSubmit={handleSubmit}
          solarFarm={solarFarm}
        />
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
          handleClick={handleCloseModal}
          label="Cancel"
          sx={{ width: "20%" }}
        />
        <ButtonWithIcon
          label="Save"
          formId="editFarmForm"
          type="submit"
          icon={SaveIcon}
          sx={{
            backgroundColor: "primary.main",
            "&:hover": {
              backgroundColor: "primary.main",
            },
            width: "15%",
            py: 1,
          }}
        />
      </Grid>
    </GlobalModal>
  );
};
