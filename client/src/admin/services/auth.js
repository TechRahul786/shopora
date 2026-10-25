import api from "../../services/api"
export const adminLogin = async (form) =>{
    const response = await api.post('/auth/login',form)
    const user = response.data
    return user
}