import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import Message from "./Message";
import { Link, useNavigate, useParams } from "react-router-dom";

const Election = ({ election }) => {
  const navigate = useNavigate();

  const voteHandler = (id) => {
    navigate(`/vote/${id}`);
  };

  const resultHandler = (id) => {
    navigate(`/result/${id}`);
  };
  return (
    <Card className="my-3 p-3 rounded election-card">
      <Card.Body>
        <Link to={`/elections/${election._id}`}>
          <Card.Title as="div">
            <strong>{election.name}</strong>
          </Card.Title>
          <Card.Text as="div"></Card.Text>
          <Card.Text as="h3">{election.description}</Card.Text>
        </Link>
        {election.isFinished && <Message variant="success">Finished</Message>}
        {election.isStarted && !election.isFinished && (
          <Message variant="warning">Running</Message>
        )}
        {!election.isStarted && (
          <Message variant="danger">Yet To Start</Message>
        )}

        {election.isFinished && (
          <Button
            variant="primary"
            className="my-3"
            onClick={() => resultHandler(election._id)}
          >
            View Result
          </Button>
        )}
        {election.isStarted && !election.isFinished && (
          <Button
            variant="primary"
            className="my-3"
            onClick={() => voteHandler(election._id)}
          >
            Vote Now
          </Button>
        )}
        {!election.isStarted && (
          <Button
            variant="primary"
            className="my-3"
            disabled
            onClick={() => voteHandler(election._id)}
          >
            Vote Now
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default Election;
