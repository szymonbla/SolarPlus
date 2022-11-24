import {
  DashboardTileLayout,
  ReadOnlyTextField,
} from "common/components/Shared";
import { ProducedEnergy } from "types/farmEnergy";

interface OutputSolarFarmProps {
  producedEnergy: ProducedEnergy;
}

export const OutputSolarFarm = ({ producedEnergy }: OutputSolarFarmProps) => {
  const {
    yearToYearVariabilityKWH,
    yearlyInPlaneIrradiationKWM2,
    yearlyPVEnergyProductionKWH,
  } = producedEnergy;
  return (
    <DashboardTileLayout sx={{ flex: 1 }}>
      <ReadOnlyTextField
        label="Average annual energy production"
        value={`${yearlyPVEnergyProductionKWH}`}
      />
      <ReadOnlyTextField
        label="Standard deviation of the annual energy production due to year-to-year variation"
        value={`${yearlyInPlaneIrradiationKWM2}`}
      />
      <ReadOnlyTextField
        label="Average annual sum of global irradiation per square meter received by the modules of the given system"
        value={`${yearToYearVariabilityKWH}`}
      />
    </DashboardTileLayout>
  );
};
