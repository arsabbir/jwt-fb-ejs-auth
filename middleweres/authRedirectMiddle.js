import Respons from "../utility/Respons.js";


const authRedirectMiddle = (req,res,next) => {
    const token = req.cookies.authToken
    if (token) {
    new Respons(`You are already loged in`,'','/login',req,res);
       
    }else{
        next()
    }
}

export default authRedirectMiddle