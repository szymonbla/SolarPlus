import { Button, SxProps } from "@mui/material";

interface SubmitButtonProps {
  label: string;
  handleClick: () => void;
  sx?: SxProps;
}

export const SubmitButton = ({ label, sx }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      sx={{
        backgroundColor: "common.white",
        width: "100%",
        typography: "body1",
        fontWeight: "00",
        color: "text.primary",
        borderRadius: 3,
        "&:hover": {
          backgroundColor: "common.white",
        },
        "&:active": {
          backgroundColor: "common.white",
        },
        "&:focus": {
          backgroundColor: "common.white",
        },
        ...sx,
      }}
    >
      {label}
    </Button>
  );
};
