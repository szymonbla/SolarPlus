import Image from "next/image";
import { Button, SxProps } from "@mui/material";

interface ButtonWithIcon {
  label: string;
  handleClick: () => void;
  isStartIcon?: boolean;
  icon: string;
  sx?: SxProps;
}

export const ButtonWithIcon = ({
  handleClick,
  icon,
  label,
  isStartIcon,
  sx,
}: ButtonWithIcon) => {
  return (
    <Button
      onClick={handleClick}
      startIcon={
        isStartIcon && <Image src={icon} width={24} height={24} alt="icon" />
      }
      endIcon={
        !isStartIcon && <Image src={icon} width={24} height={24} alt="icon" />
      }
      sx={{ color: "common.white", typography: "subtitle2", ...sx }}
    >
      {label}
    </Button>
  );
};
