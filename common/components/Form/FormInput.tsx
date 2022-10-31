import {
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  SxProps,
} from "@mui/material";
import { useEffect } from "react";
import { useController } from "react-hook-form";

interface FormInputProps {
  label: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  sx?: SxProps;
}

export const FormInputField = ({ label, name, type, sx }: FormInputProps) => {
  const {
    field: { ref, value, ...fieldProps },
    fieldState: { error },
  } = useController({
    name,
  });

  return (
    <Grid display="flex" alignItems="center">
      <InputLabel sx={{ minWidth: "fit-content", mr: "1rem" }}>
        {label}
      </InputLabel>
      <FormControl
        error={!!error}
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          ...sx,
        }}
      >
        <Input
          {...fieldProps}
          disableUnderline
          type={type}
          name={name}
          value={value}
          inputRef={ref}
          sx={{
            color: "common.black",
            border: "2px solid",
            borderColor: "grey.300",
            borderRadius: 2,
            px: 1.5,
            py: 1,
          }}
        />
        {!!error && (
          <FormHelperText sx={{ position: "absolute", bottom: "-50%" }}>
            {error?.message}
          </FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
};
