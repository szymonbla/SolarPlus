import { ProducedFarmEnergy } from "./producedFarmEnergy";
export interface FarmModelI {
  id?: number;
  farmName: string;
  location: LocationCoordinates;
  pvPanel: PvPanelAttributes;
  created?: Date;
  producedFarmEnergy?: ProducedFarmEnergy;
}

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type LocationCoordinates = {
  latitude: string;
  longitude: string;
};

export type PvPanelAttributes = {
  peakPower: number;
  loss: number;
};

export interface IdWithFarmModel {
  farmId: number;
  farm: Omit<FarmModelI, "id">;
}

export interface SummarizedFarmsResults {
  averagePVProduction: number;
  amountOfFarms: number;
}
