import api from "./api"

export const getProducts = async() =>{
    const response = await api.get('products')
    return response.data
}

export const addProduct = async(form) =>{
    const response = await api.post('addProduct',form)
    return response.data
}