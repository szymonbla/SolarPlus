import Image from "next/image";
import { Button } from "@mui/material";

interface ButtonWithIcon {
  label: string;
  handleClick: () => void;
  isStartIcon?: boolean;
  icon: string;
}

export const ButtonWithIcon = ({
  handleClick,
  icon,
  label,
  isStartIcon,
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
      sx={{ color: "common.white", typography: "subtitle2" }}
    >
      {label}
    </Button>
  );
};
