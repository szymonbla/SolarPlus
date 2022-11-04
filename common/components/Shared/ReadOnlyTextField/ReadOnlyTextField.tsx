import { Grid, Typography } from "@mui/material";

interface ReadOnlyTextFieldProps {
  label: string;
  value: string | undefined;
}

export const ReadOnlyTextField = ({ label, value }: ReadOnlyTextFieldProps) => {
  return (
    <Grid
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <Typography>{label}</Typography>
      <Typography
        sx={{
          border: "2px solid",
          borderColor: "grey.300",
          borderRadius: 2,
          px: 1.5,
          py: 1,
        }}
      >
        {value}
      </Typography>
    </Grid>
  );
};
