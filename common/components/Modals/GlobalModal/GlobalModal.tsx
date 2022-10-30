import { ReactNode } from "react";
import { Modal, Box } from "@mui/material";

interface GlobalModalProps {
  children?: ReactNode;
}

export const GlobalModal = ({ children }: GlobalModalProps) => {
  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          backgroundColor: "common.white",
          minWidth: 1000,
          minHeight: 600,
          borderRadius: 8,
          position: "relative",
          px: 4,
          py: 2
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};
