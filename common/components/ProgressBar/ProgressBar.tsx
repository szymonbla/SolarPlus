import { Step, StepLabel, Stepper } from "@mui/material";
import { StepType } from "types";

interface ProgressBarProps {
  activeStep: number;
  steps: StepType[];
}

export const ProgressBar = ({ activeStep, steps }: ProgressBarProps) => {
  return (
    <Stepper activeStep={activeStep} alternativeLabel sx={{ py: "1rem" }}>
      {steps.map(({ id, label }) => (
        <Step key={id}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
