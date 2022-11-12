import { Grid, Typography } from "@mui/material";

interface FarmItemProps {
  label: string;
}

export const FarmItem = ({ label }: FarmItemProps) => {
  return (
    <Grid>
      <Typography>{label}</Typography>
    </Grid>
  );
};
