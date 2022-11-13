export interface FarmModelI {
  farmName: string;
  location: LocationCoordinates;
  pvPanel: PvPanelAttributes;
  created?: Date;
}

export type LocationCoordinates = {
  latitude: string;
  longitude: string;
};

export type PvPanelAttributes = {
  peakPower: number;
  loss: number;
};
