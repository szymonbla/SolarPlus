import { Input, InputLabel, SxProps } from "@mui/material";

interface FormInputProps {
  label: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
}

export const FormInputField = ({ label, name, type }: FormInputProps) => {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Input type={type} name={name} />
    </>
  );
};
