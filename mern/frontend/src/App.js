import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ResultScreen from "./screens/ResultScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route element={<HomeScreen />} path="/"></Route>
            <Route element={<LoginScreen />} path="/login"></Route>
            <Route element={<RegisterScreen />} path="/register"></Route>
            <Route element={<DashboardScreen />} path="/dashboard"></Route>
            <Route element={<ProfileScreen />} path="/profile"></Route>
            <Route element={<ResultScreen />} path="/result"></Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
