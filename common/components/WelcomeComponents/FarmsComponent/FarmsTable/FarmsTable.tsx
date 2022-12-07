import { Dispatch, SetStateAction } from "react";
import { DataGrid, GridSelectionModel } from "@mui/x-data-grid";
import moment from "moment";

import { DashboardTileLayout } from "common/components/Shared";
import { FarmModelI } from "types";
import { columnGroupingModel, columns, DDMMYY } from "common/constants";

interface FarmsTableProps {
  rows: FarmModelI[];
  selectionModel: GridSelectionModel;
  setSelectionModel: Dispatch<SetStateAction<GridSelectionModel>>;
}

function mapToTableGrid(farm: FarmModelI) {
  return {
    ...farm,
    latitude: farm.location.latitude,
    longitude: farm.location.longitude,
    peakPower: farm.pvPanel.peakPower,
    loss: farm.pvPanel.loss,
    created: moment(farm.created).format(DDMMYY),
  };
}

export const FarmsTable = ({
  rows,
  selectionModel,
  setSelectionModel,
}: FarmsTableProps) => {
  const mappedFarms = rows.map(mapToTableGrid);

  return (
    <DashboardTileLayout
      sx={{
        width: "100%",
        height: "100%",
        my: "2rem",
      }}
    >
      <DataGrid
        rows={mappedFarms}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
        experimentalFeatures={{ columnGrouping: true }}
        columnGroupingModel={columnGroupingModel}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
        sx={{
          "& .MuiDataGrid-columnSeparator": { color: "grey.300" },
          "& .MuiDataGrid-cell": { borderColor: "grey.300" },
        }}
      />
    </DashboardTileLayout>
  );
};
