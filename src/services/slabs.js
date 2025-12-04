import api from "./api";

// GET slabs (with search, sort, filter, pagination)
export async function getSlabs(params = {}) {
  const response = await api.get("/slabs", { params });
  return response.data;
}




// CREATE slab
export async function createSlab(payload) {
  const response = await api.post("/slabs", payload);
  return response.data;
}

// UPDATE slab
export async function updateSlab(id, payload) {
  const response = await api.put(`/slabs/${id}`, payload);
  return response.data;
}

// DELETE slab
export async function deleteSlab(id) {
  const response = await api.delete(`/slabs/${id}`);
  return response.data;
}
