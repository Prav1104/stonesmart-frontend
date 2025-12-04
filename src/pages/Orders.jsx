import React, { useState, useEffect, useCallback } from "react";
import { getOrders, createOrder, updateOrder, deleteOrder } from "../services/orders";
import OrderForm from "../components/orders/OrderForm";
import "../styles/orders.css";

/* Debounce hook */
function useDebounce(value, delay = 350) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [sortDir, setSortDir] = useState("asc");

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const debouncedSearch = useDebounce(search, 300);

  /* Fetch orders */
  const fetchOrders = useCallback(async () => {
    try {
      const res = await getOrders({
        q: debouncedSearch,
        status: status !== "All" ? status : "",
        sortBy: "customer_name",
        sortDir,
      });

      const arr = res.data || res.data?.data || [];
      setOrders(arr);

    } catch (err) {
      console.error("Failed to load orders:", err);
      alert("Failed to load orders");
    }
  }, [debouncedSearch, status, sortDir]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const saveOrder = async (form) => {
    try {
      if (editing) await updateOrder(editing._id, form);
      else await createOrder(form);

      setShowForm(false);
      setEditing(null);
      fetchOrders();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Save failed");
    }
  };

  const removeOrder = async (order) => {
    if (!window.confirm("Delete this order?")) return;
    await deleteOrder(order._id);
    fetchOrders();
  };

  return (
    <div className="orders-container">

      {/* Top Controls */}
      <div className="orders-topbar">
        <input
          className="order-search"
          placeholder="Search by customer or slab..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="order-filter"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

        <button
          className="add-order-btn"
          onClick={() => { setEditing(null); setShowForm(true); }}
        >
          + Add Order
        </button>
      </div>

      {/* Sort Button */}
      <div className="sort-container">
        <button className="sort-btn" onClick={() => setSortDir(d => d === "asc" ? "desc" : "asc")}>
          Sort by Customer ({sortDir})
        </button>
      </div>

      {/* Orders Grid */}
      <div className="orders-grid">
        {orders.length === 0 ? (
          <p className="empty-msg">No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} className="order-card">
              <h2 className="order-title">{order.customer_name}</h2>

              <p><strong>Phone:</strong> {order.customer_phone}</p>
              <p><strong>Slab:</strong> {order.slab_name}</p>
              <p><strong>Qty:</strong> {order.quantity}</p>
              <p><strong>Total:</strong> ₹ {order.total_price}</p>
              <p><strong>Status:</strong> {order.status}</p>

              <div className="order-actions">
                <button className="edit-btn" onClick={() => { setEditing(order); setShowForm(true); }}>Edit</button>
                <button className="delete-btn" onClick={() => removeOrder(order)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <OrderForm
              initial={editing}
              onSave={saveOrder}
              onCancel={() => { setShowForm(false); setEditing(null); }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
