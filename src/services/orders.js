import api from "./api";

export async function getOrders(params = {}) {
  const res = await api.get("/orders", { params });
  return res.data;
}

export async function createOrder(data) {
  const res = await api.post("/orders", data);
  return res.data;
}

export async function updateOrder(id, data) {
  const res = await api.put(`/orders/${id}`, data);
  return res.data;
}

export async function deleteOrder(id) {
  const res = await api.delete(`/orders/${id}`);
  return res.data;
}
