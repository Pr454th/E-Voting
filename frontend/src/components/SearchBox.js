import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const history = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history(`/search/${keyword}`);
    } else {
      history(`/dashboard`);
    }
  };

  return (
    <Form onSubmit={submitHandler} inline="true" className="d-flex">
      <Form.Control
        type="text"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Elections..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <div className="mx-2">
        <Button
          type="submit"
          variant="outline-success"
          className="mr-sm-2 ml-sm-5"
        >
          Search
        </Button>
      </div>
    </Form>
  );
};

export default SearchBox;
