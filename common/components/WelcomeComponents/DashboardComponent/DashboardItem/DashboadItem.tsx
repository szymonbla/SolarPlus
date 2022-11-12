import { Grid, Typography } from "@mui/material";
import { ButtonWithIcon } from "common/components/Shared";
import Image from "next/image";
import AddIcon from "common/images/addIcon.svg";
import { useAppDispatch } from "redux/hooks";
import { openModal } from "redux/reducers";

export interface DashboardItemProps {
  icon: string;
  value: string | number;
  subtitle: string;
  isAddingAvailable?: boolean;
}

export const DashboardItem = ({
  icon,
  value,
  subtitle,
  isAddingAvailable,
}: DashboardItemProps) => {
  const dispatch = useAppDispatch();

  const openCreationFarmModal = () => {
    dispatch(openModal());
  };
  return (
    <Grid
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap={2}
      sx={{
        position: "relative",
        height: 250,
        width: 300,
        borderRadius: 3,
        backgroundColor: "common.white",
        p: "2rem",
        boxShadow: "-3px 9px 11px 1px rgba(238, 238, 247, 1);",
      }}
    >
      <Image src={icon} width={50} height={50} alt="icon" />
      <Typography variant="h5" fontWeight="900">
        {value}
      </Typography>
      <Typography variant="subtitle2">{subtitle}</Typography>
      {isAddingAvailable ? (
        <ButtonWithIcon
          icon={AddIcon}
          isStartIcon={true}
          label="Add farm"
          handleClick={openCreationFarmModal}
          sx={{
            color: "common.black",
            position: "absolute",
            bottom: "2rem",
          }}
        />
      ) : (
        <Typography>Start from</Typography>
      )}
    </Grid>
  );
};
