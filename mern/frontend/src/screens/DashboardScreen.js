import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Election from "../components/Election";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { listElections } from "../actions/electionActions";

const DashboardScreen = () => {
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const electionList = useSelector((state) => state.electionList);
  const { loading, error, elections } = electionList;

  useEffect(() => {
    dispatch(listElections(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      <Meta />
      <Link to="/" className="btn btn-light">
        Go Back
      </Link>

      <h1>Latest Elections</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {elections &&
              elections.map((election) => (
                <Col key={election._id} sm={12} md={6} lg={4} xl={3}>
                  <Election election={election} />
                </Col>
              ))}
          </Row>
        </>
      )}
    </div>
  );
};

export default DashboardScreen;
