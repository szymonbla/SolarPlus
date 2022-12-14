import { SolarFarmForm } from "./SolarFarmForm";
import { FarmInitializationForm } from "./FarmInitializationForm";
import { SummaryPanel } from "./SummaryPanel";

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
    case 2: {
      return <SummaryPanel />;
    }

    default: {
      return null;
    }
  }
};
