import React, { useState, useEffect } from "react";
function ProductList() {
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editProduct, setEditProduct] = useState({});
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(stored);
  }, []);
  const handleDelete = (idx) => {
    const updated = products.filter((_, i) => i !== idx);
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };
  const handleEdit = (idx) => {
    setEditIndex(idx);
    setEditProduct(products[idx]);
  };
  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };
  const handleEditSave = () => {
    const updated = products.map((p, i) => (i === editIndex ? editProduct : p));
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
    setEditIndex(-1);
  };
  return (
    <div>
      <h2>Product List</h2>
      <table border="1" cellPadding="8" style={{ width: "100%", background: "#fff" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Date & Time</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, idx) => (
            <tr key={p.id}>
              <td>
                {editIndex === idx ? (
                  <input name="name" value={editProduct.name} onChange={handleEditChange} />
                ) : (
                  p.name
                )}
              </td>
              <td>{p.id}</td>
              <td>{p.dateTime}</td>
              <td> 
                {editIndex === idx ? (
                  <input name="quantity" type="number" value={editProduct.quantity} onChange={handleEditChange} />
                ) : (
                  p.quantity
                )}
              </td>
              <td>
                {editIndex === idx ? (
                  <>
                    <button onClick={handleEditSave}>Save</button>
                    <button onClick={() => setEditIndex(-1)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(idx)}>Edit</button>
                    <button onClick={() => handleDelete(idx)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ProductList;
