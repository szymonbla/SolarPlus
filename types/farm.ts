export interface FarmModelI {
  id: string;
  farmName: string;
  location: Partial<LocationCoordinates>;
  pvPanel: Partial<PvPanelAttributes>;
}

export type FarmBodyModel = {
  name: string;
  location: LocationCoordinates;
  pvPanel: PvPanelAttributes;
};

export type LocationCoordinates = {
  latitude: string;
  longitude: string;
};

export type PvPanelAttributes = {
  peakPower: number;
  loss: number;
};
