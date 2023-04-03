import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useLogout } from "@thirdweb-dev/react";
import SearchBox from "./SearchBox";
import { logOut } from "../actions/userActions";

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { logout, isLoading } = useLogout();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const link = location.pathname.split("/")[1];

  const logoutHandler = () => {
    logout();
    dispatch(logOut());
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand>
            {userInfo?._id ? "Welcome " + userInfo.name : "E-Voting"}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {(link?.includes("dashboard") || link?.includes("search")) && (
              <SearchBox />
            )}

            <Nav className="me-auto" />
            {userInfo?._id ? (
              <Nav>
                <LinkContainer to="/dashboard">
                  <Nav.Link>DashBoard</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/profile">
                  <Nav.Link>Profile</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                </LinkContainer>
              </Nav>
            ) : (
              <Nav>
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user" />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            )}
            {userInfo?.isAdmin && (
              <Nav>
                <NavDropdown title="Admin" id="adminMenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/electionlist">
                    <NavDropdown.Item>Elections</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
