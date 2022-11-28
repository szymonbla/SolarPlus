import { z } from "zod";
import {
  farmConfigurationSchema,
  solarPanelConfigurationSchema,
} from "common/components/Modals/types";
export interface FarmModelI {
  id?: number;
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

export const mainFarmConfiguration = farmConfigurationSchema.merge(
  solarPanelConfigurationSchema
);

export type MainFarmConfigurationData = z.infer<typeof mainFarmConfiguration>;
