import { Dispatch, SetStateAction } from "react";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import moment from "moment";

import { DashboardTileLayout } from "common/components/Shared";
import { FarmModelI } from "types";
import { columnGroupingModel, cellConfig, DDMMYY } from "common/constants";

interface FarmsTableProps {
  rows: FarmModelI[];
  selectionModel: GridSelectionModel;
  editable: boolean;
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
  editable,
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
        columns={getColumns(editable)}
        pageSize={7}
        rowsPerPageOptions={[7]}
        experimentalFeatures={{ columnGrouping: true, newEditingApi: true }}
        columnGroupingModel={columnGroupingModel}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        editMode="row"
        selectionModel={selectionModel}
        sx={{
          "& .MuiDataGrid-columnSeparator": { color: "grey.300" },
          "& .MuiDataGrid-cell": { borderColor: "grey.300" },
        }}
      />
    </DashboardTileLayout>
  );
};

function getColumns(editable: boolean) {
  const columns: GridColDef[] = [
    {
      ...cellConfig,
      field: "id",
      type: "number",
      minWidth: 70,
    },
    {
      ...cellConfig,
      field: "farmName",
      headerName: "Farm name",
      editable,
    },
    {
      ...cellConfig,
      field: "created",
      headerName: "Farm created",
    },
    {
      ...cellConfig,
      field: "latitude",
      headerName: "Latitude",
      type: "number",
      editable,
    },
    {
      ...cellConfig,
      field: "longitude",
      headerName: "Longitude",
      type: "number",
      editable,
    },

    {
      ...cellConfig,
      field: "peakPower",
      headerName: "PeakPower",
      type: "number",
      editable,
    },
    {
      ...cellConfig,
      field: "loss",
      headerName: "Loss",
      type: "number",
      editable,
    },
  ];

  return columns;
}
