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
      sx={{
        width: "20%",
        height: "100%",
        backgroundColor: "background.default",
      }}
    >
      <Grid display="flex" flexDirection="column" sx={{ mb: "2rem" }}>
        <Profile />
        <Button onClick={handleClick} sx={{ backgroundColor: "common.white", borderRadius: '12px' }}>
          Sign out
        </Button>
      </Grid>
      <Divider sx={{ width: "80%", textAlign: "center" }} />
    </Grid>
  );
};
