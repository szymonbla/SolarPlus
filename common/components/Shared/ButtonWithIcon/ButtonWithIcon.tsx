import Image from "next/image";
import { Button, SxProps } from "@mui/material";

interface ButtonWithIcon {
  label: string;
  handleClick: () => void;
  icon: string;
  disabled?: boolean;
  isStartIcon?: boolean;
  sx?: SxProps;
}

export const ButtonWithIcon = ({
  handleClick,
  icon,
  label,
  isStartIcon,
  disabled,
  sx,
}: ButtonWithIcon) => {
  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      startIcon={
        isStartIcon && <Image src={icon} width={32} height={32} alt="icon" />
      }
      endIcon={
        !isStartIcon && <Image src={icon} width={32} height={32} alt="icon" />
      }
      sx={{
        color: "common.white",
        typography: "subtitle2",
        minWidth: "fit-content",
        p: 1,
        ...sx,
      }}
    >
      {label}
    </Button>
  );
};
