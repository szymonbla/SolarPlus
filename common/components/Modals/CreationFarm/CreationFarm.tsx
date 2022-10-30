import { Grid, Typography } from "@mui/material";
import { useAppDispatch } from "redux/hooks";
import { closeModal } from "redux/reducers";

import { CancelButton, SubmitButton } from "common/components/Form";
import { GlobalModal } from "common/components/Modals/GlobalModal";
import { FormInputField } from "common/components/Form";
export const CreationFarm = () => {
  const dispatch = useAppDispatch();

  const closeCreationModal = () => {
    dispatch(closeModal());
  };

  return (
    <GlobalModal handleClose={closeCreationModal}>
      <Typography variant="h3" fontWeight="700" sx={{ color: "common.black" }}>
        Create farm
      </Typography>
      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", px: '8rem' }}
      >
        <FormInputField label="Farm name" name="farmName" type="text" />
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
          handleClick={() => console.log("Next step")}
          label="Next"
          sx={{ width: "20%" }}
        />
      </Grid>
    </GlobalModal>
  );
};
