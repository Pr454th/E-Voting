import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Meta from "../components/Meta";
import { listElections, deleteElection } from "../actions/electionActions";

const ElectionListScreen = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const electionList = useSelector((state) => state.electionList);
  const { loading, error, elections } = electionList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const electionDelete = useSelector((state) => state.electionDelete);
  const { success: successDelete } = electionDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listElections(""));
    } else {
      history("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandle = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteElection(id));
    }
  };

  return (
    <>
      <Meta title="Elections | E-Voting" />
      <Row className="align-items-center">
        <Col>
          <h1>Elections</h1>
        </Col>
        <Col className="text-right">
          <LinkContainer to="/admin/createelection">
            <Button className="my-3">
              <i className="fas fa-plus"></i>Create Election
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th>ELECTION STATUS</th>
                <th>STARTED AT</th>
                <th>FINISHED AT</th>
              </tr>
            </thead>
            <tbody>
              {elections.map((election) => (
                <tr key={election._id}>
                  <td>{election._id}</td>
                  <td>{election.createdAt.substring(0, 10)}</td>

                  <td>{election.name}</td>
                  <td>{election.description}</td>
                  <td>
                    {election.isStarted
                      ? election.isFinished
                        ? "Finished"
                        : "Started"
                      : "Not Started"}
                  </td>
                  <td>
                    {election.isStarted ? (
                      election.startedAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {election.isFinished ? (
                      election.finishedAt.substring(0, 10)
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/elections/${election._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ElectionListScreen;
