import React from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <Container className="p-0">
        <Row className="text-white py-5">
          <Col
            className="text-center"
            style={{
              backgroundImage: 'url("bg-voting.jpg")',
              backgroundSize: "stretch",
              backgroundPosition: "center",
            }}
          >
            <h1 className="text-white">Welcome to the Voting Website</h1>
            <p className="lead">
              Vote for your favorite candidates and make your voice heard!
            </p>
          </Col>
        </Row>
        <Row className="py-5">
          <Col>
            <h2>What is the Voting Website?</h2>
            <p className="lead">
              The Voting Website is an online platform where you can vote for
              your favorite candidates in various elections and surveys.
            </p>
            <p className="lead">
              We believe that everyone should have a say in the decisions that
              affect their lives, and the Voting Website is our way of
              empowering people to make their voices heard.
            </p>
          </Col>
        </Row>
        <Row className="bg-light py-5">
          <Col>
            <h2>Why Choose the Voting Website?</h2>
            <p className="lead">
              There are many reasons to choose the Voting Website:
            </p>
            <ul className="lead">
              <li>Easy to use</li>
              <li>Secure and reliable</li>
              <li>Transparent and fair</li>
              <li>Accessible to all</li>
              <li>And much more!</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeScreen;
