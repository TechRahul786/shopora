import api from "./api"

export const getCategory = async () =>{
    const response = await api.get('/categories')
    const categories = response.data
    return categories
}

export const addCategory = async (data) =>{
    const response = await api.post('/categories',data)
    const category =  response.data
    return category.data
}

export const updateCategory = async (id,data) =>{
    const response = await api.post(`/categories/${id}`,data)
    return response.data
}

export const removeCategory = async (id) =>{ 
    const response = await api.post(`/categories/${id}`,id)
    return response.data
}

