import api from "./api"

export const getProducts = async() =>{
    const response = await api.get('products')
    return response.data
}

export const getProductsById = async (id) =>{
    console.log('getProductsById',id)
    const response = await api.get(`products/${id}`)
    const product = response.data
    return product.data
}

export const addProduct = async(form) =>{
    const response = await api.post('products',form)
    return response.data
}

export const updateProduct = async(id,form) =>{
    const response = await api.put(`products/${id}`,form)
    return response.data
}

export const removeProduct = async(id) =>{
    const response = await api.delete(`products/${id}`)
    return response.data
}