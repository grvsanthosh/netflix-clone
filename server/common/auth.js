import bcrypt from "bcryptjs"
import {ENV_VARS} from "../config/envVars.js"
import jwt from "jsonwebtoken"

//hashing password
const hashedPassword = async (pwd)=>{
    let salt = await bcrypt.genSalt(Number(ENV_VARS.SALT))
    let hashPassword = await bcrypt.hash(pwd,salt)
    return hashPassword
}

//decode password
const decodePassword = async (pwd,hashedpwd)=>{
    const validPass = await bcrypt.compare(pwd,hashedpwd)
    return validPass
}

//create token
const createToken = async (userId,res)=>{
    try{
        let token = jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn:'1h'})
        
        res.cookie("jwt-netflix",token,{
            maxAge: 1 * 60 * 60 * 1000, // 1 hour in ms
            httpOnly: true, // prevents xss attacks
            sameSite: "strict",
            secure: ENV_VARS.NODE_ENV !== 'development'
        })

        return token

    }
    catch(e){
        console.error("token not generated ",e.message)
    }
}


export default {hashedPassword,createToken,decodePassword}