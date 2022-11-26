import {
  DashboardTileLayout,
  ReadOnlyTextField,
} from "common/components/Shared";
import { ProducedEnergy } from "types/farmEnergy";

interface OutputSolarFarmProps {
  producedEnergy: ProducedEnergy;
}

export const OutputSolarFarm = ({ producedEnergy }: OutputSolarFarmProps) => {
  const { inPlaneIrradiationKWM2, pVEnergyProductionKWH, variabilityKWH } =
    producedEnergy.yearly;
  return (
    <DashboardTileLayout sx={{ flex: 1 }}>
      <ReadOnlyTextField
        label="Average annual energy production"
        value={`${pVEnergyProductionKWH}`}
      />
      <ReadOnlyTextField
        label="Standard deviation of the annual energy production due to year-to-year variation"
        value={`${inPlaneIrradiationKWM2}`}
      />
      <ReadOnlyTextField
        label="Average annual sum of global irradiation per square meter received by the modules of the given system"
        value={`${variabilityKWH}`}
      />
    </DashboardTileLayout>
  );
};
