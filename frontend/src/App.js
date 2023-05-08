import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ResultScreen from "./screens/ResultScreen";
import ElectionScreen from "./screens/ElectionScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ElectionListScreen from "./screens/ElectionListScreen";
import ElectionCreateScreen from "./screens/ElectionCreateScreen";
import ElectionEditScreen from "./screens/ElectionEditScreen";
import PageNotFoundScreen from "./screens/PageNotFoundScreen";
import { USER_LOGIN_SUCCESS } from "./constants/userConstants";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/users/auth");
        if (data?.name) {
          dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Router>
          <Header />
          <main className="py-3">
            <Container>
              <Routes>
                <Route element={<HomeScreen />} path="/"></Route>
                <Route element={<LoginScreen />} path="/login"></Route>
                <Route element={<RegisterScreen />} path="/register"></Route>
                <Route element={<DashboardScreen />} path="/dashboard"></Route>
                <Route
                  path="/search/:keyword"
                  element={<DashboardScreen />}
                  exact
                ></Route>{" "}
                <Route element={<ProfileScreen />} path="/profile"></Route>
                <Route
                  element={<ElectionScreen />}
                  path="/elections/:id"
                ></Route>
                <Route element={<ResultScreen />} path="/result/:id"></Route>
                <Route
                  element={<UserListScreen />}
                  path="/admin/userlist"
                ></Route>
                <Route
                  element={<ElectionListScreen />}
                  path="/admin/electionlist"
                ></Route>
                <Route
                  element={<UserEditScreen />}
                  path="/admin/user/:id/edit"
                ></Route>
                <Route
                  element={<ElectionCreateScreen />}
                  path="/admin/createelection"
                ></Route>
                <Route
                  element={<ElectionEditScreen />}
                  path="/admin/election/:id/edit"
                ></Route>
                <Route element={<PageNotFoundScreen />} path="*"></Route>
              </Routes>
            </Container>
          </main>
          <Footer />
        </Router>
      )}
    </>
  );
}

export default App;
