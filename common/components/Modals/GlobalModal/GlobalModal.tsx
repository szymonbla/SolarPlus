import { ReactNode } from "react";
import { Modal, Box } from "@mui/material";
import { useAppSelector } from "redux/hooks";
import { selectModalState } from "redux/reducers";
import { RootState } from "redux/store";
interface GlobalModalProps {
  children?: ReactNode;
}

export const GlobalModal = ({ children }: GlobalModalProps) => {
  const isModalOpen = useAppSelector(selectModalState);
  return (
    <Modal
      open={isModalOpen}
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
          py: 2,
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};
