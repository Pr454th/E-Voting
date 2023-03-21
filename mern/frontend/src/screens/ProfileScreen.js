import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { getUserDetails, updateUserProfile } from "../actions/userActions";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setmessage] = useState(null);

  const history = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (userInfo?._id) {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
        setGender(user.gender);
        if (user.gender === "Male" || user.gender === "Female") {
          document.getElementById(user.gender).checked = true;
        }
      }
    } else {
      history("/login");
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    user.name = name;
    user.email = email;
    user.gender = gender;
    e.preventDefault();
    if (password !== confirmPassword) {
      setmessage("Passwords Don't Match");
    } else {
      dispatch(
        updateUserProfile({ id: user._id, name, email, gender, password })
      );
    }
  };

  return (
    <Row>
      <Meta title="Profile | E-Voting" />
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error} </Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
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
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label as="legend">Select Gender</Form.Label>
            <Form.Check
              type="radio"
              name="gender"
              label="Male"
              id="Male"
              value="Male"
              onChange={(e) => setGender(e.target.value)}
            ></Form.Check>
            <Form.Check
              type="radio"
              name="gender"
              label="Female"
              id="Female"
              value="Female"
              onChange={(e) => setGender(e.target.value)}
            ></Form.Check>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button className="my-3" type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
