import { StepLabel, StepType, StepLabelDisplayName } from "types";

export const farmProgressBar: StepType[] = [
  {
    id: StepLabel.FarmInitialization,
    label: StepLabelDisplayName[StepLabel.FarmInitialization],
  },
  {
    id: StepLabel.SetUpSolarPanel,
    label: StepLabelDisplayName[StepLabel.SetUpSolarPanel],
  },
  {
    id: StepLabel.Summary,
    label: StepLabelDisplayName[StepLabel.Summary],
  },
];
