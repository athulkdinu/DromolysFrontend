import { Alert } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement);

function Histogram({ histogramData, selectedColumn }) {
  if (!histogramData ||!histogramData.bins ||!histogramData.counts) {
    return <Alert>Histogram is available only for numeric columns</Alert>;
  }

  const data = {
    labels: histogramData.bins,
    datasets: [
      {
        label: selectedColumn || "Histogram",
        data: histogramData.counts,
      },
    ],
  };

  return <Bar data={data} />;
}

export default Histogram;
