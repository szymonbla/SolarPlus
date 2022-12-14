import Image from "next/image";
import { Button, SxProps } from "@mui/material";

interface ButtonWithIcon {
  label: string;
  icon: string;
  handleClick?: (props?: any) => void;
  type?: "button" | "submit" | "reset" | undefined;
  formId?: string;
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
  formId,
  type,
  sx,
}: ButtonWithIcon) => {
  return (
    <Button
      type={type}
      form={formId}
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
