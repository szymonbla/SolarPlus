import { z } from "zod";
import { solarFarmInputs } from "./solarFarmInputs";

export const solarPanelConfigurationSchema = solarFarmInputs.pick({
  loss: true,
  peakPower: true,
});

export type SolarPanelConfigurationData = z.infer<
  typeof solarPanelConfigurationSchema
>;
