import User from "../models/user.js";
import bcrypt from "bcrypt";
import setTokenCookie from "../utils/setTokenCookie.js";

//Register

export const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const normalizedEmail = email.trim().toLowerCase();
    const emailExist = await User.findOne({ email: normalizedEmail });

    if (emailExist) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      role,
    });

    setTokenCookie(res, user._id);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
};

//Login

export const login = async (req,res,next) =>{
  console.log(req.body)
   try {
     const {email,password} = req.body
 if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase()

    const user = await User.findOne({email:normalizedEmail}).select('+password')
    if(!user){
        return res.status(400).json({
            success:false,
            message:'Invalid email or password'
        })
    }

    const isPasswordMatched = await bcrypt.compare(password,user.password)

    if(!isPasswordMatched){
       return res.status(400).json({
            success:false,
            message:'Invalid email or password'
        }) 
    }


    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive",
      });
    }
    setTokenCookie(res,user._id)
    
    res.status(200).json({
        success: true,
      message: "Login successful",
        user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    })
   } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
   }
}

//Logout
export const logout = (req,res) =>{
    res.clearCookie('token',{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:'lax'
    })
    return res.status(200).json({
        success:true,
        message:'Logout successful'
    })
}