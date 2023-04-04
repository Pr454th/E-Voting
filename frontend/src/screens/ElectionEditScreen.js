import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import Meta from "../components/Meta";
import {
  listElectionDetails,
  updateElection,
} from "../actions/electionActions";
import { ELECTION_UPDATE_RESET } from "../constants/electionConstants";

const ElectionEditScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();

  const electionDetails = useSelector((state) => state.electionDetails);
  const { loading, error, election } = electionDetails;

  const electionUpdate = useSelector((state) => state.electionUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = electionUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ELECTION_UPDATE_RESET });
      history("/admin/electionlist");
    } else {
      if (!election.name || election._id !== id) {
        dispatch(listElectionDetails(id));
      } else {
        setName(election.name);
        setDescription(election.description);
      }
    }
  }, [dispatch, history, id, election, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateElection({
        _id: id,
        name,
        description,
      })
    );
  };

  return (
    <div>
      <Meta title="Edit Election | E-Voting" />
      <Link to="/admin/electionlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Election</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default ElectionEditScreen;
