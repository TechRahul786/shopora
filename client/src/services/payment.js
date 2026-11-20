import api from "./api";

export const createStripeSession = async (payload) => {
  const response = await api.post("/payment/stripe", payload);
  return response.data;
};