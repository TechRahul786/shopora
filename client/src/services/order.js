import api from "./api";

// Add order
export const addOrder = async (data) => {
  const res = await api.post("/order", data);
  return res.data;
};

// Get logged-in user's orders
export const getMyOrders = async () => {
  const response = await api.get("/order");
  return response.data;
};

// Get all orders (Admin)
export const getAllOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

// Update order status (Admin)
export const updateOrder = async (id, orderStatus) => {
  const response = await api.patch(`/orders/${id}/status`, {
    orderStatus,
  });

  return response.data;
};