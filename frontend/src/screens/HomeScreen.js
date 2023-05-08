import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getContract } from "../actions/contractActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContract());
  }, [dispatch]);

  return <h3 className="text-center">HomePage</h3>;
};

export default HomeScreen;
