import { SolarFarmForm } from "./SolarFarmForm";
import { FarmInitializationForm } from "./FarmInitializationForm";

export const creationFormResolver = (
  formStep: number,
  formId: string
): JSX.Element | null => {
  switch (formStep) {
    case 0: {
      return <FarmInitializationForm formId={formId} />;
    }
    case 1: {
      return <SolarFarmForm formId={formId} />;
    }

    default: {
      return null;
    }
  }
};
