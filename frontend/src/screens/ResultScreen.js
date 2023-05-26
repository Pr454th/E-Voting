import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { listElectionDetails } from "../actions/electionActions";
import { Tabs, Tab } from "react-bootstrap";

import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
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
      display: false,
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

const optionsForPie = {
  maintainAspectRatio: true,
  responsive: true,
  width: "400",
  height: "400",
  plugins: {
    legend: {
      position: "left",
      labels: {
        font: {
          size: 20,
        },
      },
      title: {
        display: true,
        padding: {
          right: 30,
        },
      },
    },
    title: {
      align: "start",
      display: false,
      text: "Election Result",
      padding: {
        bottom: 0,
      },
      font: {
        size: 30,
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: user } = userLogin;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

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
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 99, 132, 0.2)",
        ],

        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(255, 99, 132, 1)",
        ],
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
          <Tabs
            defaultActiveKey="bar"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="bar" title="Bar">
              <Bar options={options} data={data} />
            </Tab>
            <Tab eventKey="pie" title="Pie">
              <center>
                <div style={{ width: "70%", height: "70%" }}>
                  <Pie data={data} options={optionsForPie} />
                </div>
              </center>
            </Tab>
          </Tabs>
        </>
      )}
      ;
    </div>
  );
}
