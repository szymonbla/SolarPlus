export interface StepType {
  id: number;
  label: string;
}

export enum StepLabel {
  FarmInitialization,
  SetUpSolarPanel,
  Summary,
}

export const StepLabelDisplayName: Record<StepLabel, string> = {
  [StepLabel.FarmInitialization]: "Farm initialization",
  [StepLabel.SetUpSolarPanel]: "Set up solar panel",
  [StepLabel.Summary]: "Summary",
};
