import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import Meta from "../components/Meta";
// import { listProductDetails, updateProduct } from "../actions/productActions";
// import { ELECTION_UPDATE_RESET } from "../constants/productConstants";

const ElectionEditScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isStarted, setIsStarted] = useState(true);
  const [isFinished, setIsFinished] = useState(false);

  return <div></div>;
};

export default ElectionEditScreen;
