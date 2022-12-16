import { SolarFarmForm } from "./SolarFarmForm";
import { FarmInitializationForm } from "./FarmInitializationForm";
import { SummaryPanel } from "./SummaryPanel";
import { Dispatch, SetStateAction } from "react";

export const creationFormResolver = (
  formStep: number,
  formId: string,
  setIsSelectionByMapChoice: Dispatch<SetStateAction<boolean>>
): JSX.Element | null => {
  switch (formStep) {
    case 0: {
      return (
        <FarmInitializationForm
          formId={formId}
          setIsSelectionByMapChoice={setIsSelectionByMapChoice}
        />
      );
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
