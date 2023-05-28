import React, { useState, useEffect } from "react";
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
import {
  useContract,
  useAddress,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";

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

  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);
  const [winner, setWinner] = useState("");
  const [winnerVotes, setWinnerVotes] = useState(0);
  const electionDetails = useSelector((state) => state.electionDetails);
  const { loading, error, election } = electionDetails;
  const [total, setTotal] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState([]);
  const [uniqueResults, setUniqueResults] = useState([]);
  const { data: getElectionResults, isLoading } = useContractRead(
    contract,
    "getElectionResults",
    [election._id]
  );
  const { data: totalVotes } = useContractRead(contract, "getTotalVotes", [
    election._id,
  ]);

  //removing duplicates
  if (!isLoading) {
  }
  useEffect(() => {
    if (!isLoading) {
      setUniqueResults(
        Array.from(new Set(getElectionResults.map(JSON.stringify)), JSON.parse)
      );
    }
  }, [getElectionResults]);
  const [votesMapping, setVotesMapping] = useState({});
  // const votesMapping = {};
  useEffect(() => {
    if (!isLoading) {
      uniqueResults.forEach((result) => {
        const address = result[0];
        const votes = result[2].hex;
        console.log(votes);
        // If the address is not present, initialize the votes
        if (!votesMapping[address])
          votesMapping[address] = votes ? Number(votes) : 0;
        setTotal((prev) => prev + votesMapping[address]);
      });
    }

    let winnerAddress;
    let maxVotes = 0;

    // Iterate over the entries of the votesMapping
    for (const [address, votes] of Object.entries(votesMapping)) {
      if (votes > maxVotes) {
        maxVotes = votes;
        winnerAddress = address;
      }
    }
    for (let i = 0; i < election?.candidates?.length; i++) {
      if (election?.candidates[i]?.address === winnerAddress) {
        setWinner(election?.candidates[i]?.name);
        setWinnerVotes(maxVotes);
      }
    }
    console.log("Winner:", winner);
    console.log("Winner Votes:", winnerVotes);

    console.log("Winner Address:", winnerAddress);
    console.log("Number of Votes:", maxVotes);

    console.log(votesMapping);
  }, [election?.candidates?.length, uniqueResults]);

  useEffect(() => {
    dispatch(listElectionDetails(id));
  }, [dispatch, id]);

  const data = {
    labels: election?.candidates?.map((candidate) => candidate.name),
    datasets: [
      {
        label: "Votes",
        data: Object.values(votesMapping),
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
          <h5>Winner: {winner}</h5>
          <h5>
            Number of Votes: {winnerVotes === 0 ? "No votes yet" : winnerVotes}
          </h5>
          <h5>
            Percentage of Votes:
            {(winnerVotes / Number(totalVotes)) * 100}%
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
