import { z } from "zod";

export const solarPanelConfigurationSchema = z.object({
  peakPower: z.string(),
  loss: z.string(),
});

export type SolarPanelConfigurationData = z.infer<
  typeof solarPanelConfigurationSchema
>;
