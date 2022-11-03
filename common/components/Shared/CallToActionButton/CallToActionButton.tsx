import { Button, SxProps } from "@mui/material";

interface CallToActionButtonProps {
  label: string;
  handleClick: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  sx?: SxProps;
}

export const CallToActionButton = ({
  label,
  type,
  handleClick,
  sx,
}: CallToActionButtonProps) => {
  return (
    <Button
      onClick={handleClick}
      type={type}
      sx={{
        width: "100%",
        backgroundColor: (theme) => `${theme.palette.action.active}`,
        typography: "body1",
        fontWeight: "600",
        px: "1rem",
        py: "0.5rem",
        borderRadius: 2,
        color: "common.white",
        boxShadow: (theme) =>
          `0px 15px 15px -10px ${theme.palette.action.hover}`,
        "&:hover": {
          backgroundColor: "action.hover",
        },
        ...sx,
      }}
    >
      {label}
    </Button>
  );
};
