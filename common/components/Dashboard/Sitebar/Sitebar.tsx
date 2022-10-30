import { Button, Divider, Grid } from "@mui/material";

import { Profile } from "common/components";
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
        <Button
          onClick={handleClick}
          sx={{
            backgroundColor: "common.white",
            borderRadius: "12px",
            width: "40%",
          }}
        >
          Sign out
        </Button>
      </Grid>
      <Divider sx={{ width: "80%" }} />
      <Button
        onClick={openCreationFarmModal}
        sx={{
          backgroundColor: "common.white",
          borderRadius: "12px",
          width: "40%",
        }}
      >
        Create farm
      </Button>
    </Grid>
  );
};
