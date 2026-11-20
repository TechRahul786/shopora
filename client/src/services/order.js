import api from "./api"

export const addOrder = async(data) =>{
    const res = await api.post('/order',data)
    return res.data
}

export const getMyOrders = async (userId) => {
  const response = await api.get("/order",userId);
  return response.data;
};