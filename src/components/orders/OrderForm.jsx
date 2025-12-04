import React, { useState, useEffect } from "react";

export default function OrderForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState({
      _id: null, 
    customer_name: "",
    customer_phone: "",
    slab_name: "",
    quantity: "",
    total_price: "",
    status: "Pending",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        _id: initial._id, 
        customer_name: initial.customer_name,
        customer_phone: initial.customer_phone,
        slab_name: initial.slab_name,
        quantity: initial.quantity,
        total_price: initial.total_price,
        status: initial.status,
      });
    }
  }, [initial]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form className="slab-form" onSubmit={submit}>
      <h2 className="slab-form-title">
        {initial ? "Edit Order" : "Add New Order"}
      </h2>

      <label className="slab-label">Customer Name</label>
      <input name="customer_name" value={form.customer_name} onChange={handleChange} required />

      <label className="slab-label">Customer Phone</label>
      <input name="customer_phone" value={form.customer_phone} onChange={handleChange} required />

      <label className="slab-label">Slab Name</label>
      <input name="slab_name" value={form.slab_name} onChange={handleChange} required />

      <label className="slab-label">Quantity</label>
      <input type="number" name="quantity" value={form.quantity} onChange={handleChange} required />

      <label className="slab-label">Total Price (₹)</label>
      <input type="number" name="total_price" value={form.total_price} onChange={handleChange} required />

      <label className="slab-label">Status</label>
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Pending</option>
        <option>Processing</option>
        <option>Completed</option>
        <option>Cancelled</option>
      </select>

      <div className="slab-form-actions">
        <button type="submit" className="save-btn">{initial ? "Save Changes" : "Add Order"}</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
