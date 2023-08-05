import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()


// jwt
class JWT {
    static createToken(data, time ='365d') {
        return jwt.sign(data,process.env.JWT_SECRET,{expiresIn : time})
    };

    static verifyToken (token){
       return jwt.verify(token,process.env.JWT_SECRET);
    }
}
export default JWT