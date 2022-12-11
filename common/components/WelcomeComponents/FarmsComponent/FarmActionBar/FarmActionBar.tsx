import { Dispatch, SetStateAction } from "react";
import { Grid } from "@mui/material";
import { GridSelectionModel } from "@mui/x-data-grid";
import { useAppDispatch } from "redux/hooks";
import { openModal } from "redux/reducers";
import { ButtonWithIcon, CallToActionButton } from "common/components/Shared";
import DeleteIcon from "common/images/actionBar/delete.svg";
import EditIcon from "common/images/actionBar/edit.svg";
import SaveIcon from "common/images/actionBar/save.svg";

interface FarmActionBarProps {
  selectedFarmIndex: GridSelectionModel;
  inEdit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
}

export const FarmActionBar = ({
  selectedFarmIndex,
  inEdit,
  setEdit,
}: FarmActionBarProps) => {
  const dispatch = useAppDispatch();
  const isFarmSelected = selectedFarmIndex.length !== 0;

  const openFarmCreationModal = () => {
    dispatch(openModal());
  };

  return (
    <Grid display="flex" gap={2}>
      {inEdit ? (
        <ButtonWithIcon
          label="Save"
          handleClick={() => {
            setEdit(false);
          }} // invoke update solar farm endpoint
          isStartIcon={true}
          icon={SaveIcon}
          disabled={!isFarmSelected}
          sx={{
            backgroundColor: !isFarmSelected
              ? `secondary.300`
              : "secondary.main",
            "&:hover": { backgroundColor: "secondary.main" },
          }}
        />
      ) : (
        <ButtonWithIcon
          label="Edit"
          handleClick={() => setEdit(true)}
          isStartIcon={true}
          disabled={!isFarmSelected}
          icon={EditIcon}
          sx={{
            backgroundColor: !isFarmSelected ? `warning.300` : "warning.main",
            "&:hover": { backgroundColor: "warning.main" },
          }}
        />
      )}

      <ButtonWithIcon
        label="Delete"
        handleClick={() => console.log("tes")}
        isStartIcon={true}
        disabled={!isFarmSelected}
        icon={DeleteIcon}
        sx={{
          backgroundColor: !isFarmSelected ? `error.300` : "error.main",
          "&:hover": { backgroundColor: "error.main" },
        }}
      />
      <CallToActionButton
        label="Add farm"
        handleClick={openFarmCreationModal}
      />
    </Grid>
  );
};
