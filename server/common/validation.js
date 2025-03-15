const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailValidator = (email)=>{
   return emailRegex.test(email)
}

const passwordValidator = (password)=>{
    if(password.length > 5)
        return true
}


export default {emailValidator,passwordValidator}
