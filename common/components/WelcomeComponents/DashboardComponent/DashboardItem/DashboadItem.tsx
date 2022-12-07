import { Grid, Typography } from "@mui/material";
import { ButtonWithIcon } from "common/components/Shared";
import Image from "next/image";
import AddIcon from "common/images/addIcon.svg";
import { useAppDispatch } from "redux/hooks";
import { openModal } from "redux/reducers";
import { DashboardTileLayout } from "common/components/Shared";

export interface DashboardItemProps {
  icon: string;
  value: number;
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
    <DashboardTileLayout
      sx={{
        height: 250,
        width: "30%",
        gap: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
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
    </DashboardTileLayout>
  );
};
