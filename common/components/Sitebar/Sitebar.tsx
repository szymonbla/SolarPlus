import { Grid } from "@mui/material";

import { Profile } from "common/components";
import { ButtonWithIcon } from "common/components/Shared";
import SignOutIcon from "common/images/logout.svg";
import { Navigation } from "common/components/Navigation";

interface SitebarProps {
  handleClick: () => void;
}

export const Sitebar = ({ handleClick }: SitebarProps) => {
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
