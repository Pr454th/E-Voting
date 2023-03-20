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

  const electionDetails = useSelector((state) => state.electionDetails);
  const { loading, error, election } = electionDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listElectionDetails(id));
  }, [dispatch, id]);

  const resultHandler = () => {
    navigate(`/result/${id}`);
  };

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
          <Row>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{election.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  Description: {election.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroup.Item className="mx-auto">
                <Col>
                  <Button
                    onClick={resultHandler}
                    className="btn-block"
                    type="button"
                  >
                    View Result
                  </Button>
                </Col>
              </ListGroup.Item>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ElectionScreen;
