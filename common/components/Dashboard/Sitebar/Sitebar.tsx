import { Divider, Grid } from "@mui/material";

import { SubmitButton, Profile } from "common/components";
import { CallToActionButton } from "common/components/Shared";
import { useAppDispatch } from "redux/hooks";
import { openModal } from "redux/reducers";
interface SitebarProps {
  handleClick: () => void;
}

export const Sitebar = ({ handleClick }: SitebarProps) => {
  const dispatch = useAppDispatch();

  const openCreationFarmModal = () => {
    dispatch(openModal());
  };

  return (
    <Grid
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        width: "20%",
        height: "100%",
        backgroundColor: "background.default",
      }}
    >
      <Grid
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ mb: "2rem" }}
      >
        <Profile />
        <SubmitButton handleClick={handleClick} label="Sign out" />
      </Grid>
      <Divider sx={{ width: "80%" }} />
      <CallToActionButton
        handleClick={openCreationFarmModal}
        label="Create farm"
        type="button"
        sx={{ width: "50%", my: "2rem" }}
      />
    </Grid>
  );
};
