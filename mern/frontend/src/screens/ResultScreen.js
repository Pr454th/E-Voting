import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { listElectionDetails } from "../actions/electionActions";

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
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";

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

function indexOfMax(arr) {
  if (arr?.length > 0) {
    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
      }
    }
    return maxIndex;
  }
}

function sum(arr) {
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

export default function ResultScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const electionDetails = useSelector((state) => state.electionDetails);
  const { loading, error, election } = electionDetails;

  useEffect(() => {
    dispatch(listElectionDetails(id));
  }, [dispatch, id]);

  const data = {
    labels: election?.candidates?.map((candidate) => candidate.name),
    datasets: [
      {
        label: "Votes",
        data: election?.candidates?.map((candidate) => candidate.votes),
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Meta title={election?.name} />
      <h1>Result Screen</h1>
      {data?.labels?.length > 0 && (
        <>
          <h5>Winner: {data?.labels[indexOfMax(data?.datasets[0]?.data)]}</h5>
          <h5>
            Number of Votes:{" "}
            {data?.datasets[0]?.data[indexOfMax(data?.datasets[0]?.data)]}
          </h5>
          <h5>
            Percentage of Votes:{" "}
            {(data.datasets[0].data[indexOfMax(data.datasets[0].data)] /
              sum(data.datasets[0].data)) *
              100}
            %
          </h5>
        </>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Bar options={options} data={data} />
        </>
      )}
      ;
    </div>
  );
}
