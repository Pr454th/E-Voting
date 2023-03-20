import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Election = ({ election }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Body>
        <Card.Title as="div">
          <strong>{election.name}</strong>
        </Card.Title>
        <Card.Text as="div"></Card.Text>
        <Card.Text as="h3">{election.description}</Card.Text>
        <Button className="my-3" type="submit" variant="primary">
          View
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Election;
