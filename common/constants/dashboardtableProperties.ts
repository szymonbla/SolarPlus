import { GridColDef, GridColumnGroupingModel } from "@mui/x-data-grid";

const CELL_WIDTH = 200;

const cellConfig: Omit<GridColDef, "field"> = {
  minWidth: CELL_WIDTH,
  align: "left",
  headerAlign: "left",
};

export const columns: GridColDef[] = [
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
  },
  {
    ...cellConfig,
    field: "longitude",
    headerName: "Longitude",
    type: "number",
  },

  {
    ...cellConfig,
    field: "peakPower",
    headerName: "PeakPower",
    type: "number",
  },
  {
    ...cellConfig,
    field: "loss",
    headerName: "Loss",
    type: "number",
  },
];

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
