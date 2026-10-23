import express from "express"
import { login, logout, registerUser } from "../controllers/authController.js"
import {protect} from '../middlewares/authMiddleware.js'

const authRouter = express.Router()

authRouter.post('/register',registerUser)
authRouter.post('/login',login)
authRouter.post('/logout',logout)
authRouter.get('/me',protect,(req,res)=>{
    return res.status(200).json({success:true,
        message:{firstName:req.user.firstName,id:req.user.id}
    })
})

export default authRouter