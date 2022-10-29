import { Button, Divider, Grid } from "@mui/material";

import { Profile } from "common/components";

interface SitebarProps {
  handleClick: () => void;
}

export const Sitebar = ({ handleClick }: SitebarProps) => {
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
    </Grid>
  );
};
