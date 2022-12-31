import { ErrorMessages, errorMessages } from "common/constants";
import { z } from "zod";

export const solarFarmInputs = z.object({
  farmName: z
    .string()
    .min(1, { message: errorMessages[ErrorMessages.Required] })
    .max(32, { message: "Your farm name cannot be too long!" }),
  latitude: z
    .string()
    .min(1, { message: errorMessages[ErrorMessages.Required] })
    .superRefine((val, ctx) => {
      const isValueNumber = isNaN(Number(val));
      if (isValueNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errorMessages[ErrorMessages.ExpectedNumber],
        });
        return;
      }

      const numberValue = Number(val);
      const wrongLocation = numberValue >= -90 && numberValue <= 90;
      if (!wrongLocation) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Value should be between -90.0 and 90.0",
        });
      }
    }),
  longitude: z
    .string()
    .min(1, { message: errorMessages[ErrorMessages.Required] })
    .superRefine((val, ctx) => {
      const isValueNumber = isNaN(Number(val));
      if (isValueNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errorMessages[ErrorMessages.ExpectedNumber],
        });
        return;
      }

      const numberValue = Number(val);
      const wrongLocation = numberValue >= -180 && numberValue <= 180;
      if (!wrongLocation) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "The value should be between -180.0 and 180.0",
        });
      }
    }),
  peakPower: z
    .string()
    .min(1, { message: errorMessages[ErrorMessages.Required] })
    .superRefine((val, ctx) => {
      const isValueNumber = isNaN(Number(val));
      if (isValueNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errorMessages[ErrorMessages.ExpectedNumber],
        });
        return;
      }
      const numberValue = Number(val);
      const wrongLocation = numberValue >= 0 && numberValue <= 1000;
      if (!wrongLocation) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "The value should be positive and less than 1000",
        });
      }
    }),
  loss: z
    .string()
    .min(1, { message: errorMessages[ErrorMessages.Required] })
    .superRefine((val, ctx) => {
      const isValueNumber = isNaN(Number(val));
      if (isValueNumber) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errorMessages[ErrorMessages.ExpectedNumber],
        });
        return;
      }
      const numberValue = Number(val);
      const wrongLocation = numberValue >= 0 && numberValue <= 100;
      if (!wrongLocation) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "The value should be positive and less than 100",
        });
      }
    }),
});

export type SolarFarmInputsData = z.infer<typeof solarFarmInputs>;
