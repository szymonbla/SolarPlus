export interface FarmI {
  id?: string;
  farmName?: string;
  location: LocationCoordinates;
  pvPanel?: PvPanelAttributes;
}

export type LocationCoordinates = {
  latitude: string;
  longitude: string;
};

export type PvPanelAttributes = {
  peakPower: number;
  loss: number;
};

export type FarmBodyModel = {
  name: string;
  location: LocationCoordinates;
  pvPanel: PvPanelAttributes;
};
