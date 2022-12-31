import {
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  SxProps,
} from "@mui/material";
import { useController } from "react-hook-form";

interface FormInputProps {
  label: string;
  name: string;
  type?: React.HTMLInputTypeAttribute;
  valueInReadOnly?: string | number;
  readOnly?: boolean;
  sx?: SxProps;
}

export const FormInputField = ({
  label,
  name,
  type,
  valueInReadOnly,
  readOnly,
  sx,
}: FormInputProps) => {
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
          readOnly={readOnly}
          type={type}
          name={name}
          defaultValue={!readOnly ? valueInReadOnly : value}
          value={readOnly ? valueInReadOnly : value}
          inputRef={ref}
          sx={{
            border: "2px solid",
            borderColor: readOnly ? "common.white" : "grey.300",
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
