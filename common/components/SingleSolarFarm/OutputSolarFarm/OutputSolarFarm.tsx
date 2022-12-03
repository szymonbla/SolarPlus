import {
  DashboardTileLayout,
  ReadOnlyTextField,
} from "common/components/Shared";
import { ProducedFarmEnergy } from "types/producedFarmEnergy";

interface OutputSolarFarmProps {
  producedEnergy?: ProducedFarmEnergy;
}

export const OutputSolarFarm = ({ producedEnergy }: OutputSolarFarmProps) => {
  return (
    <DashboardTileLayout sx={{ flex: 1 }}>
      <ReadOnlyTextField
        label="Average annual energy production"
        value={`${producedEnergy?.yearly?.pVEnergyProductionKWH}`}
      />
      <ReadOnlyTextField
        label="Standard deviation of the annual energy production due to year-to-year variation"
        value={`${producedEnergy?.yearly?.variabilityKWH}`}
      />
      <ReadOnlyTextField
        label="Average annual sum of global irradiation per square meter received by the modules of the given system"
        value={`${producedEnergy?.yearly?.inPlaneIrradiationKWM2}`}
      />
    </DashboardTileLayout>
  );
};
