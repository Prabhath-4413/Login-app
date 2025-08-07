import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Login from "./Login";
import Home from "./Home";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loggedInFlag = localStorage.getItem("isLoggedIn");
    const savedUsername = localStorage.getItem("username");

    if (loggedInFlag === "true" && savedUsername) {
      setIsLoggedIn(true);
      setUsername(savedUsername);
    }
  }, []);

  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/home/add-product" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/home"
          element={
            isLoggedIn ? (
              <Home onLogout={handleLogout} username={username} />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="add-product" element={<AddProduct />} />
          <Route path="product-list" element={<ProductList />} />
        </Route>
        <Route
          path="*"
          element={
            <Navigate to={isLoggedIn ? "/home/add-product" : "/login"} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
