import { z } from "zod";
import { solarFarmInputs } from "./solarFarmInputs";

export const farmInitializationSchema = solarFarmInputs.pick({
  farmName: true,
  latitude: true,
  longitude: true,
});

export type FarmInitializationData = z.infer<typeof farmInitializationSchema>;
