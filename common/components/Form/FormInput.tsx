import { FormControl, Grid, Input, InputLabel } from "@mui/material";

interface FormInputProps {
  label: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
}

export const FormInputField = ({ label, name, type }: FormInputProps) => {
  return (
    <Grid
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        width: "100%",
      }}
    >
      <InputLabel sx={{ width: "20%", mr: "1rem" }}>{label}</InputLabel>
      <FormControl
        sx={{
          border: "2px solid",
          borderColor: "grey.300",
          borderRadius: 2,
          px: 1.5,
          width: "80%",
        }}
      >
        <Input
          disableUnderline
          type={type}
          name={name}
          sx={{
            color: "common.black",
          }}
        />
      </FormControl>
    </Grid>
  );
};
