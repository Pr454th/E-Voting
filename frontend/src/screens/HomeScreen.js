import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getContract } from "../actions/contractActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContract());
  }, [dispatch]);

  return <div>HomePage</div>;
};

export default HomeScreen;
