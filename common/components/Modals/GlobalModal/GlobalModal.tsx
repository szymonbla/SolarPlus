import { ReactNode } from "react";
import { Modal, Box } from "@mui/material";
import { useAppSelector } from "redux/hooks";
import { selectModalState } from "redux/reducers";
interface GlobalModalProps {
  handleClose: () => void;
  children?: ReactNode;
}

export const GlobalModal = ({ handleClose, children }: GlobalModalProps) => {
  const isModalOpen = useAppSelector(selectModalState);

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "common.white",
          minWidth: 1000,
          height: 600,
          borderRadius: "2rem",
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
