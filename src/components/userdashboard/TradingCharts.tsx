import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Info } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"];
const profitData = [40, 50, 60, 60, 50, 60, 55, 50, 60];
const lossData = [60, 70, 90, 90, 70, 80, 75, 65, 85];

const data = {
  labels: months,
  datasets: [
    {
      label: "Profit",
      data: profitData,
      backgroundColor: "#22c55e", // green-500
      borderRadius: 4,
    },
    {
      label: "Loss",
      data: lossData,
      backgroundColor: "#ef4444", // red-500
      borderRadius: 4,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top" as const,
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        color: "#ffffffff",
        font: { size: 12, weight: "bold" as const },
      },
    },
    title: { display: false },
    tooltip: { enabled: true },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { color: "#64748b", font: { size: 12 } },
    },
    y: {
      
      ticks: { color: "#64748b", font: { size: 12 } },
      beginAtZero: true,
      max: 120,
      stepSize: 30,
    },
  },
};

export function TradingCharts({ showOverlay = false }: { showOverlay?: boolean }) {
  return (
    <div className="rounded-2xl bg-muted/30 p-6 flex items-center justify-center min-h-[260px]">
      <div className="w-full max-w-2xl">
        <Bar data={data} options={options} />
      </div>
       {/* Overlay message */}
      {showOverlay && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-muted/80">
          <div className="flex flex-col items-center">
            <Info className="h-8 w-8 text-muted-foreground mb-2" />
            <span className="text-lg font-medium text-muted-foreground text-center">
              We'll show your balance graph here once there is enough data
            </span>
          </div>
        </div>
      )}
    </div>
  );
}