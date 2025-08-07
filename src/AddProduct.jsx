import { useState } from "react";
import { useNavigate } from "react-router-dom";
function generateProductId() {
  return Math.floor(100000000000000 + Math.random() * 900000000000000).toString();
}
function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    id: generateProductId(),
    dateTime: new Date().toLocaleString(),
    quantity: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validate = () => {
    const newErrors = {};
    if (!product.name) newErrors.name = "Product Name is required";
    if (!product.quantity) newErrors.quantity = "Quantity is required";
    return newErrors;                                 
  };
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    navigate("/home/product-list");
  };
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "calc(100vh - 80px)"
    }}>
      <form onSubmit={handleSubmit} style={{
        background: "#fff",
        padding: 32,
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(15, 11, 11, 0.53)",
        minWidth: 400,
        border: "1px solid #eee"
      }}> 
        <h2 style={{ textAlign: "center", marginBottom: 24, fontWeight: 700 }}>Add Product</h2>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Product Name:</label>
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: 8,
              fontSize: 15,
              border: errors.name ? "2px solid #e53935" : "1px solid #ccc",
              borderRadius: 4
            }}
          />
          {errors.name && <div style={{ color: "#e53935", fontSize: 13, marginTop: 2 }}>{errors.name}</div>}
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Product ID:</label>
          <input
            name="id"
            value={product.id}
            readOnly
            style={{ width: "100%", padding: 8, fontSize: 15, border: "1px solid #ccc", borderRadius: 4, background: "#f9f9f9" }}
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Date & Time:</label>
          <input
            name="dateTime"
            value={product.dateTime}
            readOnly
            style={{ width: "100%", padding: 8, fontSize: 15, border: "1px solid #ccc", borderRadius: 4, background: "#f9f9f9" }}
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Quantity:</label>
          <input
            name="quantity"
            type="number"
            value={product.quantity}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: 8,
              fontSize: 15,
              border: errors.quantity ? "2px solid #e53935" : "1px solid #ccc",
              borderRadius: 4
            }}
          />
          {errors.quantity && <div style={{ color: "#e53935", fontSize: 13, marginTop: 2 }}>{errors.quantity}</div>}
        </div>
        <button type="submit" style={{
          width: "100%",
          padding: 10,
          background: "#16a34a",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          fontWeight: 600,
          fontSize: 16,
          cursor: "pointer"
        }}>Add Product</button>
      </form>
    </div>
  );
}
export default AddProduct;