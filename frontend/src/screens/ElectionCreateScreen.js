import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import Meta from "../components/Meta";
import { createElection } from "../actions/electionActions";
import { ELECTION_CREATE_RESET } from "../constants/electionConstants";

const ElectionCreateScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const history = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const electionCreate = useSelector((state) => state.electionCreate);
  const { loading, error, success } = electionCreate;

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      history("/login");
    }
    if (success) {
      dispatch({ type: ELECTION_CREATE_RESET });
      history("/admin/electionlist");
    }
  }, [dispatch, success, userInfo?.isAdmin, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createElection(name, description));
  };

  return (
    <>
      <Meta title="Create Election | E-Voting" />
      <Link to="/admin/electionlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Election</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="name"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Create
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ElectionCreateScreen;
