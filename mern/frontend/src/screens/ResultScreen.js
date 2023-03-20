import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Election Result",
    },
  },
  tooltips: {
    mode: "label",
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: "Candidates",
      },
    },
    y: {
      display: true,
      title: {
        display: true,
        text: "Votes",
      },
    },
  },
};

const data = {
  labels: ["jan", "feb", "mar"],
  datasets: [
    {
      label: "Number of Votes",
      data: [11, 22, 33],
      backgroundColor: ["rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(54, 162, 235, 1)"],
      borderWidth: 1,
    },
  ],
};

export default function ResultScreen() {
  return <Bar options={options} data={data} />;
}
