import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
function Home({ onLogout }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <div style={{ width: 200, background: "#222", color: "#fff", padding: 20 }}>
        <h2>Menu</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li><Link to="add-product" style={{ color: "#fff" }}>Add Product</Link></li>
          <li><Link to="product-list" style={{ color: "#fff" }}>Product List</Link></li>
        </ul>
        <button onClick={handleLogout} style={{ marginTop: 20 }}>Logout</button>
      </div>
      <div style={{ flex: 1, padding: 40, background: "#f4f4f4" }}>
        <Outlet />
      </div>
    </div>
  );
}
export default Home;