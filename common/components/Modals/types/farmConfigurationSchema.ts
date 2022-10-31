import { z } from "zod";

export const farmConfigurationSchema = z.object({
  farmName: z
    .string({
      required_error: "Farm name is required",
      invalid_type_error: "Farm name must be string",
    })
    .min(2, "Min 2 chars"),
  latitude: z.string().min(2, "Min 2 chars"),
  longitude: z.string().min(2, "Min 2 chars"),
});

export type FarmConfigurationData = z.infer<typeof farmConfigurationSchema>;
