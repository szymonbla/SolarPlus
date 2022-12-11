import { GridColDef, GridColumnGroupingModel } from "@mui/x-data-grid";

const CELL_WIDTH = 200;

export const cellConfig: Omit<GridColDef, "field"> = {
  minWidth: CELL_WIDTH,
  align: "left",
  headerAlign: "left",
};

export const columnGroupingModel: GridColumnGroupingModel = [
  {
    groupId: "location",
    headerName: "Location",
    description: "Place where farm is located",
    headerAlign: "center",
    children: [{ field: "latitude" }, { field: "longitude" }],
  },
  {
    groupId: "pvPanelAttributes",
    headerName: "Panel Attributes",
    description: "Attributes of single solar panel",
    headerAlign: "center",
    children: [{ field: "peakPower" }, { field: "loss" }],
  },
];
