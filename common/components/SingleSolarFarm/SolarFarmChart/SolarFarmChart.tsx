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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SolarFarmChartProps {
  monthlyData: ChartData<"bar">;
}

export const SolarFarmChart = ({ monthlyData }: SolarFarmChartProps) => {
  return (
    <Bar
      data={monthlyData}
      fallbackContent={<LoadingSpinner />}
      style={{ backgroundColor: "#fff", height: "100%", maxHeight: 400 }}
    />
  );
};
