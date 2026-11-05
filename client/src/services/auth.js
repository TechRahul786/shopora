import api from "./api"
export const adminLogin = async (form) =>{
    const response = await api.post('/auth/login',form)
    const user = response.data
    return user
}

export const login = async (form) =>{
    const response = await api.post('/auth/login',form)
    const user = response.data
    return user
}


export const register = async (form) =>{
    const response = await api.post('/auth/register',form) 
     const user = response.data
     return user
}