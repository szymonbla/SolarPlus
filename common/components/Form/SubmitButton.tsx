import { Button, SxProps } from "@mui/material";
import Image from "next/image";

interface SubmitButtonProps {
  label: string;
  handleClick?: () => void;
  formId?: string;
  sx?: SxProps;
}

export const SubmitButton = ({
  label,
  handleClick,
  formId,
  sx,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      form={formId}
      onClick={handleClick}
      sx={{
        backgroundColor: "primary.main",
        width: "100%",
        typography: "body1",
        fontWeight: "600",
        color: "text.primary",
        borderRadius: 2,
        boxShadow: (theme) =>
          `0px 15px 15px -10px ${theme.palette.primary.main}`,
        "&:hover": {
          backgroundColor: "primary.main",
        },
        "&:active": {
          backgroundColor: "primary.main",
        },
        "&:focus": {
          backgroundColor: "primary.main",
        },
        ...sx,
      }}
    >
      {label}
    </Button>
  );
};
