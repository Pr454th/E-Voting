import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Card, Button, Form } from "react-bootstrap";
import {
  useContract,
  useAddress,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import Meta from "../components/Meta";
import {
  listElectionDetails,
  addCandidateToElection,
  deleteCandidateFromElection,
  addVoterToElection,
  deleteVoterFromElection,
  startElection,
  finishElection,
} from "../actions/electionActions";
import {
  ELECTION_ADD_CANDIDATE_RESET,
  ELECTION_ADD_VOTER_RESET,
  ELECTION_ADD_CANDIDATE_FAIL,
  ELECTION_START_FAIL,
  ELECTION_START_RESET,
} from "../constants/electionConstants";

const ElectionScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const address = useAddress();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: user } = userLogin;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidateAddress, setCandidateAddress] = useState("");

  const [voterEmail, setVoterEmail] = useState("");
  const [selectedVoter, setSelectedVoter] = useState("");
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);
  const [add, setAdd] = useState(false);

  const electionDetails = useSelector((state) => state.electionDetails);
  const { loading, error, election } = electionDetails;

  const { error: errorAddCandidate, success: successAddCandidate } =
    useSelector((state) => state.electionAddCandidate);

  const { error: errorAddVoter } = useSelector(
    (state) => state.electionAddVoter
  );

  const { error: errorStartElection } = useSelector(
    (state) => state.electionStart
  );
  const { error: errorFinishElection } = useSelector(
    (state) => state.electionFinish
  );

  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);

  const { mutateAsync: setStatus, isLoading: statusLoad } = useContractWrite(
    contract,
    "setStatus"
  );
  const { mutateAsync: registerCandidates, isLoading: addCandidateLoad } =
    useContractWrite(contract, "registerCandidates");
  const { mutateAsync: vote, isLoading: voteLoad } = useContractWrite(
    contract,
    "vote"
  );
  const { data: totalVotes } = useContractRead(contract, "getTotalVotes", [
    election._id,
  ]);

  const { data: isVoted } = useContractRead(contract, "isVoted", [
    election._id,
    address,
  ]);

  useEffect(() => {
    dispatch({ type: ELECTION_ADD_CANDIDATE_RESET });
    dispatch({ type: ELECTION_ADD_VOTER_RESET });
    dispatch({ type: ELECTION_START_RESET });
    dispatch(listElectionDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (successAddCandidate) {
      setCandidateEmail("");
      setCandidateAddress("");
    }
  }, [successAddCandidate]);

  const isVoterCheck = () => {
    for (let i = 0; i < election?.voters?.length; i++) {
      if (election.voters[i].email == user.email) {
        return true;
      }
    }
    return false;
  };

  const resultHandler = () => {
    navigate(`/result/${id}`);
  };

  useEffect(() => {
    if (finish) {
      dispatch(finishElection(election._id));
      setFinish(false);
    }
  }, [finish]);

  const finishHandler = () => {
    const finish = async () => {
      try {
        const data = await setStatus({ args: [election._id] });
        console.info(data);
        setFinish(true);
      } catch (err) {}
    };
    finish();
  };

  useEffect(() => {
    if (start) {
      dispatch(startElection(election._id));
      setStart(false);
    }
  }, [start]);

  const startHandler = () => {
    dispatch({ type: ELECTION_START_RESET });
    const start = async () => {
      try {
        const data = await setStatus({ args: [election._id] });
        console.info(data);
        setStart(true);
      } catch (err) {}
    };
    if (election.candidates.length > 1 && election.voters.length > 0) {
      start();
    } else {
      setStart(true);
    }
  };

  const voteHandler = () => {
    dispatch({ type: ELECTION_START_RESET });
    const voteAction = async () => {
      try {
        const data = await vote({ args: [selectedVoter, election._id] });
        console.log(data);
      } catch (err) {}
    };
    if (!isVoted) {
      voteAction();
    } else {
      dispatch({
        type: ELECTION_START_FAIL,
        payload: "You have already voted",
      });
    }
  };

  useEffect(() => {
    if (add) {
      dispatch(
        addCandidateToElection(election._id, candidateEmail, candidateAddress)
      );
      setAdd(false);
    }
  }, [add]);

  const addCandidateHandler = () => {
    const add = async () => {
      try {
        const data = await registerCandidates({
          args: [candidateEmail, candidateAddress, election._id],
        });
        setAdd(true);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    const validateAddress = (address) => {
      const regex = /^(0x)?[0-9a-fA-F]{40}$/;
      const isValidAddress = regex.test(address);
      console.log(isValidAddress);
      return isValidAddress;
    };

    if (candidateEmail && candidateAddress) {
      if (validateAddress(candidateAddress)) {
        add();
      } else {
        dispatch({
          type: ELECTION_ADD_CANDIDATE_FAIL,
          payload: "Invalid Crypto Address",
        });
      }
    } else {
      setAdd(true);
    }
  };

  const editCandidateHandler = (candidateAddress, candidateEmail) => {
    setCandidateEmail(candidateEmail);
    setCandidateAddress(candidateAddress);
    dispatch(deleteCandidateFromElection(candidateAddress, election._id));
  };

  const deleteCandidateHandler = (candidateCryptoAddress) => {
    dispatch(deleteCandidateFromElection(candidateCryptoAddress, election._id));
  };

  const addVoterHandler = () => {
    dispatch(addVoterToElection(election._id, voterEmail));
  };

  const addEveryoneHandler = () => {
    dispatch(addVoterToElection(election._id, "everyone"));
  };

  const deleteVoterHandler = (voterEmail) => {
    dispatch(deleteVoterFromElection(voterEmail, election._id));
  };

  return (
    <div>
      <Meta title={"Election | " + election?._id} />
      <Link className="btn btn-light my-3" to="/dashboard">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <h1>Election {election._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{election.name}</h3>
                  <p>
                    <strong>Description: </strong>
                    {election.description}
                  </p>
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>Election Details</h3>
                  {election.isStarted ? (
                    <Message variant="success">
                      Started on {election.startedAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Started</Message>
                  )}
                  {election.isFinished && (
                    <Message variant="success">
                      Finished on {election.finishedAt}
                    </Message>
                  )}
                  {election.isStarted && !election.isFinished && (
                    <Message variant="warning">Running Now</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>Candidate Details</h3>
                  {!election.isStarted && user?.isAdmin && (
                    <FormContainer>
                      <h1>Add New Candiate</h1>
                      {errorAddCandidate && (
                        <Message variant="danger">{errorAddCandidate}</Message>
                      )}

                      <Form>
                        <Form.Group controlId="email">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Email Address"
                            value={candidateEmail}
                            onChange={(e) => setCandidateEmail(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="address">
                          <Form.Label>Crypto Address</Form.Label>
                          <Form.Control
                            type="address"
                            placeholder="Crypto Address"
                            value={candidateAddress}
                            onChange={(e) =>
                              setCandidateAddress(e.target.value)
                            }
                          ></Form.Control>
                        </Form.Group>
                        {addCandidateLoad ? (
                          <div className="my-3">
                            <Loader
                              width={"35px"}
                              height={"35px"}
                              margin={"0px"}
                            />
                          </div>
                        ) : (
                          <Button
                            variant="primary"
                            className="my-3"
                            onClick={() => addCandidateHandler()}
                          >
                            ADD CANDIDATE
                          </Button>
                        )}
                      </Form>
                    </FormContainer>
                  )}
                  {election.candidates?.length !== 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col md={3}>
                          <h5>
                            <strong>Name</strong>
                          </h5>
                        </Col>
                        <Col md={3}>
                          <h5>
                            <strong>Gender</strong>
                          </h5>
                        </Col>
                        <Col md={3}>
                          <h5>
                            <strong>Address</strong>
                          </h5>
                        </Col>
                        {user?.isAdmin && !election.isStarted && (
                          <Col md={3}>
                            <h5>
                              <strong>Modify</strong>
                            </h5>
                          </Col>
                        )}
                        {isVoterCheck() &&
                          !election.isFinished &&
                          election.isStarted && (
                            <Col md={3}>
                              <h5 className="text-center">
                                <strong>Choose</strong>
                              </h5>
                            </Col>
                          )}
                      </Row>
                    </ListGroup.Item>
                  )}
                  {election.candidates?.map((candidate) => (
                    <ListGroup.Item key={candidate._id}>
                      <Row>
                        <Col md={3}>
                          <strong>{candidate.name}</strong>
                        </Col>
                        <Col md={3}>
                          <strong>{candidate.gender}</strong>
                        </Col>
                        <Col md={3}>
                          <strong>
                            {candidate.address.substring(0, 5)}.....
                            {candidate.address.substring(
                              candidate.address.length - 4
                            )}
                          </strong>
                        </Col>
                        {user.isAdmin && !election.isStarted && (
                          <Col md={3}>
                            <Button
                              variant="flush"
                              className="btn-sm"
                              onClick={() =>
                                editCandidateHandler(
                                  candidate.address,
                                  candidate.email
                                )
                              }
                            >
                              <i className="fas fa-edit"></i>
                            </Button>

                            <Button
                              variant="danger"
                              className="btn-sm"
                              onClick={() =>
                                deleteCandidateHandler(candidate.address)
                              }
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          </Col>
                        )}
                        {isVoterCheck() &&
                          !election.isFinished &&
                          election.isStarted && (
                            <Col md={3}>
                              <h5 className="text-center">
                                <Form.Check
                                  type="checkbox"
                                  value={candidate.address}
                                  checked={candidate.address === selectedVoter}
                                  onChange={(e) =>
                                    setSelectedVoter(e.target.value)
                                  }
                                />
                              </h5>
                            </Col>
                          )}
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>Voters Details</h3>
                  {!election.isStarted && user?.isAdmin && (
                    <FormContainer>
                      <h1>Add New Voter</h1>
                      {errorAddVoter && (
                        <Message variant="danger">{errorAddVoter}</Message>
                      )}

                      <Form>
                        <Form.Group controlId="email">
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Email Address"
                            value={voterEmail}
                            onChange={(e) => setVoterEmail(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          variant="primary"
                          className="my-3"
                          onClick={() => addVoterHandler()}
                        >
                          ADD VOTER
                        </Button>
                        <Button
                          variant="primary"
                          className="my-3 mx-3"
                          onClick={() => addEveryoneHandler()}
                        >
                          ADD EVERYONE
                        </Button>
                      </Form>
                    </FormContainer>
                  )}
                  {election.voters?.length !== 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col md={3}>
                          <h5>
                            <strong>Name</strong>
                          </h5>
                        </Col>
                        <Col md={3}>
                          <h5>
                            <strong>Gender</strong>
                          </h5>
                        </Col>
                        <Col md={3}>
                          <h5>
                            <strong>Email</strong>
                          </h5>
                        </Col>
                        {user?.isAdmin && !election.isStarted && (
                          <Col md={3}>
                            <h5>
                              <strong>Modify</strong>
                            </h5>
                          </Col>
                        )}
                      </Row>
                    </ListGroup.Item>
                  )}
                  {election.voters?.map((voter) => (
                    <ListGroup.Item key={voter._id}>
                      <Row>
                        <Col md={3}>
                          <strong>{voter.name}</strong>
                        </Col>
                        <Col md={3}>
                          <strong>{voter.gender}</strong>
                        </Col>
                        <Col md={3}>
                          <strong>{voter.email}</strong>
                        </Col>
                        {user.isAdmin && !election.isStarted && (
                          <Col md={3}>
                            <Button
                              variant="danger"
                              className="btn-sm"
                              onClick={() => deleteVoterHandler(voter.email)}
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          </Col>
                        )}
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              {errorStartElection && (
                <Message variant="danger">{errorStartElection}</Message>
              )}

              {errorFinishElection && (
                <Message variant="danger">{errorFinishElection}</Message>
              )}

              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Election Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Eligible Voters</Col>
                      <Col>{election.voters?.length}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Votes Recieved</Col>
                      <Col>{totalVotes ? Number(totalVotes) : 0}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {statusLoad || voteLoad ? (
                      <div className="my-3">
                        <Loader height="35px" width="35px" margin="0px" />
                      </div>
                    ) : (
                      <>
                        {user.isAdmin &&
                          (!election.isStarted ? (
                            <Button
                              onClick={startHandler}
                              className="btn btn-block mx-3"
                              type="button"
                            >
                              Start Election
                            </Button>
                          ) : (
                            !election.isFinished && (
                              <Button
                                onClick={finishHandler}
                                className="btn btn-block mx-3"
                                type="button"
                              >
                                Finish Election
                              </Button>
                            )
                          ))}
                        {election.isStarted && isVoterCheck() ? (
                          election.isFinished ? (
                            <Button
                              onClick={resultHandler}
                              className="btn btn-block"
                              type="button"
                            >
                              View Result
                            </Button>
                          ) : (
                            <Button
                              onClick={voteHandler}
                              className="btn btn-block"
                              type="button"
                            >
                              Vote Now
                            </Button>
                          )
                        ) : (
                          <Button
                            className="btn btn-block"
                            type="button"
                            disabled
                          >
                            Vote Now
                          </Button>
                        )}
                      </>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ElectionScreen;
