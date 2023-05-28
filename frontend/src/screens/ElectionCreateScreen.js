import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import Meta from "../components/Meta";
import { addElection } from "../actions/electionActions";
import { ELECTION_CREATE_RESET } from "../constants/electionConstants";

const ElectionCreateScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [backend, setBackend] = useState(false);

  const history = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const electionCreate = useSelector((state) => state.electionCreate);
  const { loading, error, success } = electionCreate;

  const electionDetails = useSelector((state) => state.electionDetails);
  const { election } = electionDetails;

  const { contract } = useContract(process.env.REACT_APP_CONTRACT_ADDRESS);

  const { mutateAsync: createElection, isLoading } = useContractWrite(
    contract,
    "createElection"
  );

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      history("/login");
    }
    if (success && backend) {
      history(`/elections/${election._id}`);
    }
  }, [dispatch, success, userInfo?.isAdmin, backend, history]);

  useEffect(() => {
    const create = async () => {
      try {
        const data = await createElection({ args: [name, election._id] });
        setBackend(true);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (success) create();
  }, [success]);

  const submitHandler = (e) => {
    dispatch({ type: ELECTION_CREATE_RESET });
    e.preventDefault();
    dispatch(addElection(name, description));
  };

  return (
    <>
      <Meta title="Create Election | E-Voting" />
      <Link to="/admin/electionlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Election</h1>
        {error && <Message variant="danger">{error}</Message>}
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
          {isLoading ? (
            <div className="my-3">
              <Loader width={"35px"} height={"35px"} margin={"0px"} />
            </div>
          ) : (
            <Button
              type="submit"
              variant="primary"
              className="my-3"
              onClick={submitHandler}
            >
              Create
            </Button>
          )}
        </Form>
      </FormContainer>
    </>
  );
};

export default ElectionCreateScreen;
