import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { LoadingSpinner } from "common/components/Loading";
import { monthsLabels } from "common/constants";
import { EnergyData, MonthlyEnergyData } from "types/producedFarmEnergy";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SolarFarmChartProps {
  monthlyData: MonthlyEnergyData[];
}

function mapToPVEnergyProduction(data: EnergyData): number {
  return data.pVEnergyProductionKWH;
}

export const SolarFarmChart = ({ monthlyData }: SolarFarmChartProps) => {
  const monthlyChartData: ChartData<"bar"> = {
    labels: monthsLabels,
    datasets: [
      {
        label: "Monthly energy output from fix-angle PV system",
        data: monthlyData.map(mapToPVEnergyProduction),
        backgroundColor: "#FFB703",
      },
    ],
  };

  return (
    <Bar
      data={monthlyChartData}
      fallbackContent={<LoadingSpinner />}
      style={{
        backgroundColor: "#fff",
        height: "100%",
        maxHeight: 400,
        borderRadius: 12,
        padding: "1rem",
      }}
    />
  );
};
