import validation from "../common/validation.js"
import User from "../models/user.model.js"
import auth from "../common/auth.js"

export const signup = async (req,res)=>{
   try{
        const {email,password,username} = req.body;
        
        if(!email || !password || !username){
           return res.status(400).send({
                sucess:false,
                message: "All fields are required"
            })
        }

        // email validation
        const validateEmail = validation.emailValidator(email)
        if(!validateEmail){
            return res.status(400).send({
                success:false,
                message:"Invalid email"
            })
        }

        // password validation
        const validatePassword = validation.passwordValidator(password)
        if(!validatePassword){
            return res.status(400).send({
                success:false,
                message:"Password must be at lease 6 characters"
            })
        }

        // existing validation
        const existingUserByEmail = await User.findOne({email:email})
        if(existingUserByEmail){
            return res.status(400).send({
                success:false,
                message:"Email already exists"
            })
        }

        const existingUserByUsername = await User.findOne({username:username})
        if(existingUserByUsername){
            return res.status(400).send({
                success:false,
                message:"Username already exists"
            })
        }

        const PROFILE_PICS = ["/avatar1.png","/avatar2.png","/avatar3.png"]

        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]

        const hashPassword = await auth.hashedPassword(password)
        
        const newUser = new User({
            email:email,
            password:hashPassword,
            username:username,
            image:image
        })
   
        auth.createToken(newUser._id,res);
        await newUser.save()
        res.status(201).send({
            success:true,
            user: {...newUser._doc,password:""}
        })
        

   }
   catch(e){
    console.log("Error in signup controller",e.message)
    res.status(500).send({
        success:false,
        messagge:"Internal server error"
    })

   }
}

export const login = async (req,res)=>{
   try{
    const {email,password} = req.body;
    
    if(!email || !password){
        return res.status(400).send({
            success:false,
            message:"All fields are required"
        })
    }
    const user = await User.findOne({email:email})
    if(!user){
        return res.status(400).send({
            success:false,
            message:"Invalid credentials"
        })
    }

    const validPassword = await auth.decodePassword(password,user.password)
    
    if(!validPassword){
        return res.status(400).send({
            success:false,
            message:"Invalid credentials"
        })
    }

    auth.createToken(user._id,res);
    return res.status(201).send({
        success:true,
        user: {...user._doc,password:""}
    })


   }
   catch(e){
    console.log("Error in login controller",e.message)
    return res.status(500).send({
        success:false,
        messagge:"Internal server error"
    })
   }
}

export const logout = async (req,res)=>{
   try{
    res.clearCookie("jwt-netflix");
    res.status(200).send({
        success:true,
        message:"Logged out successfully"
    })
   }
   catch(e){
    console.log("Error in signup controller",e.message)
    res.status(500).send({
        success:false,
        messagge:"Internal server error"
    })
   }
}