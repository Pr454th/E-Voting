import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import myContract from "../contracts/myContract.json";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { storeWalletDetails } from "../actions/walletActions";
const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setmessage] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState({});

  const history = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const walletDetails = useSelector((state) => state.walletDetails);
  const { wallet } = walletDetails;

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

  const walletConnectHandler = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      setAccounts(accounts[0]);
      let web3;
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
      } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
      } else {
        console.error("No Ethereum provider detected");
      }
      const contractABI = myContract.abi;
      const contractAddress = "0x7f3CDd783BAb85840753Fd25B08422F5e92a3eF1";
      let contract = new web3.eth.Contract(contractABI, contractAddress);
      setContract(contract);
      dispatch(storeWalletDetails(accounts[0], "100"));
    } catch (error) {
      console.error(error);
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
      <Col md={9}>
        <h2>Wallet Details</h2>
        <Button
          className="my-3"
          variant="primary"
          onClick={walletConnectHandler}
        >
          {wallet?.isConnected ? "Wallet Connected" : "Connect Wallet"}
        </Button>
        {wallet?.isConnected && <h5>Wallet Address: {wallet.address}</h5>}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
