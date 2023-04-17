import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Card, Button, Form } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import Meta from "../components/Meta";
import {
  listElectionDetails,
  addCandidateToElection,
  deleteCandidateFromElection,
  startElection,
  finishElection,
} from "../actions/electionActions";
import { ELECTION_ADD_CANDIDATE_RESET } from "../constants/electionConstants";

const ElectionScreen = () => {
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: user } = userLogin;

  const electionDetails = useSelector((state) => state.electionDetails);
  const { loading, error, election } = electionDetails;

  const electionAddCandidate = useSelector(
    (state) => state.electionAddCandidate
  );

  const { error: errorAddCandidate, success: successAddCandidate } =
    electionAddCandidate;
  const { error: errorStartElection } = useSelector(
    (state) => state.electionStart
  );
  const { error: errorFinishElection } = useSelector(
    (state) => state.electionFinish
  );

  useEffect(() => {
    dispatch({ type: ELECTION_ADD_CANDIDATE_RESET });
    dispatch(listElectionDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (successAddCandidate) {
      setEmail("");
      setAddress("");
    }
  }, [successAddCandidate]);

  const resultHandler = () => {
    navigate(`/result/${id}`);
  };

  const finishHandler = () => {
    dispatch(finishElection(election._id));
  };

  const startHandler = () => {
    dispatch(startElection(election._id));
  };

  const voteHandler = () => {};

  const addCandidateHandler = () => {
    dispatch(addCandidateToElection(election._id, email, address));
  };

  const editCandidateHandler = (candidateAddress, candidateEmail) => {
    setEmail(candidateEmail);
    setAddress(candidateAddress);
    dispatch(deleteCandidateFromElection(candidateAddress, election._id));
  };

  const deleteCandidateHandler = (candidateAddress) => {
    dispatch(deleteCandidateFromElection(candidateAddress, election._id));
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
                  {!election.isStarted && user.isAdmin && (
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="address">
                          <Form.Label>Crypto Address</Form.Label>
                          <Form.Control
                            type="address"
                            placeholder="Crypto Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          variant="primary"
                          className="my-3"
                          onClick={() => addCandidateHandler()}
                        >
                          ADD CANDIDATE
                        </Button>
                      </Form>
                    </FormContainer>
                  )}

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
                      {user.isAdmin && !election.isStarted && (
                        <Col md={3}>
                          <h5>
                            <strong>Modify</strong>
                          </h5>
                        </Col>
                      )}
                    </Row>
                  </ListGroup.Item>
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
                          <strong>{candidate.address}</strong>
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
                      <Col>{election.voters?.length}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {user.isAdmin ? (
                      !election.isStarted ? (
                        <Button
                          onClick={startHandler}
                          className="btn btn-block"
                          type="button"
                        >
                          Start Election
                        </Button>
                      ) : election.isFinished ? (
                        <Button
                          onClick={resultHandler}
                          className="btn btn-block"
                          type="button"
                        >
                          View Result
                        </Button>
                      ) : (
                        <Button
                          onClick={finishHandler}
                          className="btn btn-block"
                          type="button"
                        >
                          Finish Election
                        </Button>
                      )
                    ) : election.isStarted ? (
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
                      <Button className="btn btn-block" type="button" disabled>
                        Vote Now
                      </Button>
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
