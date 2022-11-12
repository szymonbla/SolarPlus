import { Grid } from "@mui/material";

import { Profile } from "common/components";
import { ButtonWithIcon, CallToActionButton } from "common/components/Shared";
import { useEffect } from "react";
import { useGetAllFarmsQuery } from "redux/api/v1/farm";
import { useAppDispatch } from "redux/hooks";
import { openModal } from "redux/reducers";
import SignOutIcon from "common/images/logout.svg";
import { Navigation } from "common/components/Navigation";
interface SitebarProps {
  handleClick: () => void;
}

export const Sitebar = ({ handleClick }: SitebarProps) => {
  const dispatch = useAppDispatch();
  const openCreationFarmModal = () => {
    dispatch(openModal());
  };
  const { data, isSuccess } = useGetAllFarmsQuery("");

  useEffect(() => {
    if (isSuccess) {
      console.log(data[0].farmName);
    }
  }, [data, isSuccess]);

  return (
    <Grid
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        width: "20%",
        height: "100%",
        py: "2rem",
        backgroundColor: "background.default",
      }}
    >
      <Profile />
      {/* <CallToActionButton
        handleClick={openCreationFarmModal}
        label="Create farm"
        type="button"
        sx={{ width: "50%", my: "2rem" }}
      /> */}
      <Navigation />
      <ButtonWithIcon
        handleClick={handleClick}
        label="Sign out"
        isStartIcon={true}
        icon={SignOutIcon}
      />
    </Grid>
  );
};
