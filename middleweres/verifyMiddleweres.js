import User from "../models/userModels.js";
import JWT from "../utility/jwt.js";
import Respons from "../utility/Respons.js";
// verify user Middleware
const verifyMiddlewares = async (req, res, next) => {
  const token = req.cookies.authToken;
  try {
    // has token
    if (token) {
      // verify token
      const verifyToken = JWT.verifyToken(token);
      //  is verify
      if (verifyToken) {
        // check data
        const ableUser = User.findEmail(verifyToken.email)
        
        if (ableUser) {
          next();
        } else {
          res.clearCookie("authToken");
          delete req.session.user;
          new Respons("", "", "/login", req, res);
        }
      } else {
        res.clearCookie("authToken");
        delete req.session.user;
        new Respons("", "", "/login", req, res);
      }
    } else {
      res.clearCookie("authToken");
      delete req.session.user;
      new Respons("", "", "/login", req, res);
    }
  } catch (error) {
    res.clearCookie("authToken");
    delete req.session.user;
    new Respons("", "", "/login", req, res);
  }
};

// export verify middleware
export default verifyMiddlewares;
