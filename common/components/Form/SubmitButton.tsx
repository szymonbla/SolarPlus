import { Button, SxProps } from "@mui/material";

interface SubmitButtonProps {
  label: string;
  sx?: SxProps;
}

export const SubmitButton = ({ label, sx }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      sx={{
        width: "100%",
        typography: "body1",
        fontWeight: "600",
        borderRadius: 2,
        ...sx,
      }}
    >
      {label}
    </Button>
  );
};
