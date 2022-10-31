import { Button, SxProps } from "@mui/material";
import Image from "next/image";
import TrashIcon from "common/images/trash.svg";

interface CancelButtonProps {
  label: string;
  handleClick: () => void;
  sx?: SxProps;
}

export const CancelButton = ({ label, handleClick, sx }: CancelButtonProps) => {
  return (
    <Button
      type="button"
      onClick={handleClick}
      startIcon={
        <Image
          src={TrashIcon}
          width={24}
          height={24}
          alt="Trash icon"
        />
      }
      sx={{
        backgroundColor: "#E9EAEC",
        width: "100%",
        typography: "body1",
        fontWeight: "600",
        color: "common.black",
        borderRadius: 2,
        "&:hover": {
          backgroundColor: "#E9EAEC",
        },
        ...sx,
      }}
    >
      {label}
    </Button>
  );
};
