import api from "./api"

export const getCart = async() =>{
     const res = await api.get('/cart')
    return res
}

export const addToCart = async(productId,quantity) =>{
    const res = await api.post('/cart',{"productId":productId,quantity:quantity})
    return res.data
}

export const updateCartItemQuantity = async(productId, newQuantity) =>{
    const res = await api.put('/cart',{ productId, quantity: newQuantity })
    return res
}

export const removeFromCart = async(productId) =>{
    const res = await api.delete(`/cart/${productId}`)
    return res
}

export const clearCart = async() =>{
    const res = await api.delete('/clear')
    return res.data
}