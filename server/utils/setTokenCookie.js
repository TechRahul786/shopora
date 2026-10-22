import genrateToken from "./generateToken.js"

const setTokenCookie = (res,userId) =>{
    const token = genrateToken(userId)
    return res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV,
        sameSite:'lax',
        maxAge:24*60*60*1000
    })
}

export default setTokenCookie 