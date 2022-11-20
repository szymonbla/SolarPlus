import { Grid } from "@mui/material";
import { DataGrid, GridSelectionModel } from "@mui/x-data-grid";
import moment from "moment";

import { FarmModelI } from "types";
import { columnGroupingModel, columns, DDMMYY } from "common/constants";
import { useState } from "react";

interface DashboardTableProps {
  rows: FarmModelI[];
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

export const DashboardTable = ({ rows }: DashboardTableProps) => {
  const mappedFarms = rows.map(mapToTableGrid);
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  return (
    <Grid
      sx={{
        width: 964,
        height: "100%",
        backgroundColor: "common.white",
        borderRadius: 3,
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
    </Grid>
  );
};
