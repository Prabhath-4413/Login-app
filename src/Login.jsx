import React, { useState } from "react";
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }
    setError("");
    onLogin(username);
  };
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f4f4f4"
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "#fff",
        padding: 28,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(14, 10, 11, 0.53)",
        minWidth: 320,
        border: "1px solid #eee"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: 20, fontWeight: 600 }}>Login</h2>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", padding: 8, fontSize: 15, border: "1px solid #ccc", borderRadius: 4 }}
          />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", marginBottom: 4 }}>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 8, fontSize: 15, border: "1px solid #ccc", borderRadius: 4 }}
          />
        </div>
        {error && <div style={{ color: "red", marginBottom: 10, fontSize: 13 }}>{error}</div>}
        <button type="submit" style={{
          width: "100%",
          padding: 10,
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          fontWeight: 500,
          fontSize: 16,
          cursor: "pointer",
          marginBottom: 10
        }}>Sign in</button>
        <div style={{ textAlign: "center", fontSize: 14, color: "#555" }}>
          Don't have an account? <button type="button" style={{ color: "#2563eb", background: "none", border: "none", padding: 0, cursor: "pointer", textDecoration: "underline" }}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}
export default Login;