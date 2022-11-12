import { Divider, Grid } from "@mui/material";

import { SubmitButton, Profile } from "common/components";
import { FarmItem } from "common/components/FarmItem";
import { ButtonWithIcon, CallToActionButton } from "common/components/Shared";
import { useEffect } from "react";
import { useCreateFarmMutation, useGetAllFarmsQuery } from "redux/api/v1/farm";
import { useAppDispatch } from "redux/hooks";
import { openModal } from "redux/reducers";
import SignOutIcon from "common/images/logout.svg";
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
        sx={{ mb: "1rem" }}
      >
        <Profile />
      </Grid>
      <CallToActionButton
        handleClick={openCreationFarmModal}
        label="Create farm"
        type="button"
        sx={{ width: "50%", my: "2rem" }}
      />
      <FarmItem label={"opps"} />

      <ButtonWithIcon
        handleClick={handleClick}
        label="Sign out"
        isStartIcon={true}
        icon={SignOutIcon}
      />
    </Grid>
  );
};
