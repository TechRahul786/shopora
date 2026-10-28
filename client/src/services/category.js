import api from "./api"

export const getCategory = async () =>{
    const response = await api.get('/categories')
    const categories = response.data
    return categories
}

export const getByIdCategory = async (id) =>{
    const response = await api.get(`/categories/${id}`)
    const categories = response.data
    return categories
}

export const addCategory = async (data) =>{
    const response = await api.post('/categories',data)
    const category =  response.data
    return category.data
}

export const updateCategory = async (id, categoryData) => {
  const response = await api.put(`/categories/${id}`, categoryData);
  return response.data;
};

export const removeCategory = async (id) =>{ 
    const response = await api.delete(`/categories/${id}`)
    return response.data
}

