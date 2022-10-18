import { Button, Typography } from "@mui/material";
import GoogleIcon from "common/images/googleIcon.svg";
import Image from "next/image";

interface GoogleFormButtonProps {
  handleClick: () => void;
}

export const GoogleFormButton = ({ handleClick }: GoogleFormButtonProps) => {
  return (
    <Button
      sx={{
        display: "flex",
        border: 1,
        borderRadius: "12px",
        px: "2.5rem",
        color: "common.black",
        backgroundColor: "common.white",
        "&:hover": {
          backgroundColor: "common.white",
        },
      }}
      onClick={handleClick}
    >
      <Image src={GoogleIcon} width={48} height={48} alt="Google icon" />
      <Typography sx={{ pl: 2 }}>Sign in with Google</Typography>
    </Button>
  );
};
