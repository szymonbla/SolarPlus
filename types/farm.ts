import { z } from "zod";
import {
  farmConfigurationSchema,
  solarPanelConfigurationSchema,
} from "common/components/Modals/types";
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

export const mainFarmConfiguration = farmConfigurationSchema.merge(
  solarPanelConfigurationSchema
);

export interface IdWithFarmModel {
  farmId: number;
  farm: Omit<FarmModelI, "id">;
}

export type MainFarmConfigurationData = z.infer<typeof mainFarmConfiguration>;

export interface SummarizedFarmsResults {
  averagePVProduction: number;
  amountOfFarms: number;
}