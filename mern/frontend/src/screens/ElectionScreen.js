import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Card, Button, Form } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { listElectionDetails } from "../actions/electionActions";

const ElectionScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo: user } = userLogin;

  const electionDetails = useSelector((state) => state.electionDetails);
  const { loading, error, election } = electionDetails;

  useEffect(() => {
    dispatch(listElectionDetails(id));
  }, [dispatch, id]);

  const resultHandler = () => {
    navigate(`/result/${id}`);
  };

  const finishHandler = () => {};

  const startHandler = () => {};

  const voteHandler = () => {};

  return (
    <div>
      <Meta title={election?.name} />
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
                  {election.isStarted && election.isFinished ? (
                    <Message variant="success">
                      Finished on {election.finishedAt}
                    </Message>
                  ) : (
                    <Message variant="warning">Running Now</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h3>Candidate Details</h3>
                  <ListGroup.Item>
                    <Row>
                      <Col md={2}>
                        <h5>
                          <strong>Name</strong>
                        </h5>
                      </Col>
                      <Col md={2}>
                        <h5>
                          <strong>Gender</strong>
                        </h5>
                      </Col>
                      <Col md={3}>
                        <h5>
                          <strong>Description</strong>
                        </h5>
                      </Col>
                      <Col md={5}>
                        <h5>
                          <strong>View Profile</strong>
                        </h5>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {election.candidates?.map((candidate) => (
                    <ListGroup.Item key={candidate._id}>
                      <Row>
                        <Col md={2}>
                          <strong>{candidate.name}</strong>
                        </Col>
                        <Col md={2}>
                          <strong>{candidate.gender}</strong>
                        </Col>
                        <Col md={3}>
                          <strong>{candidate.description}</strong>
                        </Col>
                        <Col md={5}>
                          <Button
                            variant="primary"
                            onClick={() => navigate(`/users/${candidate._id}`)}
                          >
                            View Candidate
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
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
