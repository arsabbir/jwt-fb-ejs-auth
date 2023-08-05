// import Validate from "../utility/validate.js";

import Respons from "../utility/Respons.js";
import Validation from "../utility/Validation.js";
import User from "../models/userModels.js";
import Hash from "../utility/HashPass.js";
import JWT from "../utility/jwt.js";
import Mail from "../utility/Mail.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";

/**
 * @name GET
 * @dec  user sign up page
 * @access public
 */
const userSignupPage = (req, res) => {
  res.status(200).render("signUp");
};

/**
 * @name POST
 * @dec  user sign up
 * @access public
 */
const userSignup = async (req, res) => {
  // get from data on sign up
  const {
    name,
    surename,
    email,
    password,
    birthDay,
    birthMon,
    birthYear,
    gender,
  } = req.body;
  try {
    // is field
    if (
      !name ||
      !surename ||
      !email ||
      !password ||
      !birthDay ||
      !birthMon ||
      !birthYear ||
      !gender
    ) {
      // validation
      new Respons("", "All Fields Are Required", "signUp", req, res);
      //   new Validate("", "All Fields Are Required", "/signUp", req, res);
    } else if (!Validation.emailCheck(email)) {
      new Respons("", "Validate Email Address", "signUp", req, res);
    } else {
      const isEmail = await User.findEmail(email);
      // hash email
      if (isEmail[0]?.email == email) {
        // respons
        new Respons("", "email already exist", "signUp", req, res);
      } else {
        // make password
        const hashPass = Hash.makeHash(password);
        // crate data
        await User.create({
          name,
          surename,
          email,
          password: hashPass,
          birthDay,
          birthMon,
          birthYear,
          gender,
        });
        // token create
        const token = JWT.createToken({ email }, "1d");
        // create active link
        const activateLink = `${process.env.APP_URL}:${process.env.PORT}/activate/${token}`;
        // send verify email
        await Mail.verifyMail(email, { name, link: activateLink });

        new Respons(
          "Registation Successfull,Please Verify your email",
          "",
          "/signUp",
          req,
          res
        );
      }
    }
  } catch (error) {
    new Respons("", error.message, "/signUp", req, res);
  }
};
/**
 * @name GET
 * @dec  user active account
 * @access public
 */
const userActiveMail = async (req, res) => {
  const { token } = req.params;
  try {
    // is tokenk
    if (token) {
      const tokenVerify = JWT.verifyToken(token);
      if (!tokenVerify) {
        new Respons("", "Token is expire", "/login", req, res);
      } else {
        const isEmail = await User.findEmail(tokenVerify.email);


        if (isEmail[0]) {
          if (isEmail[0].isActivate == true) {
            new Respons("already account activate", "", "/login", req, res);
          }else{
                      // user active
          await User.findByIdAndUpdate(isEmail[0]._id, {
            isActivate: true,
          });
          new Respons("Email verification Succesfull", "", "/login", req, res);
          }
  

        }
      }
    }
  } catch (error) {
    new Respons("", error.message, "/login", req, res);
  }
};

/**
 * @name GET
 * @dec get user Home page
 * @access public
 */
const homePage = (req, res) => {
  res.status(200).render("home");
};

/**
 * @name GET
 * @dec get user Login page
 * @access public
 */
const homeLoginPage = (req, res) => {
  res.status(200).render("index");
};

/**
 * @name POST
 * @dec  user Login
 * @access public
 */
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      new Respons("", "All fields are required", "/login", req, res);
    } else {
      if (!Validation.emailCheck(email)) {
        new Respons("", "Email Should be Validate", "/login", req, res);
      } else {
        const userData = await User.findEmail(email);

        if (userData[0]) {
          // password check
          const pass = Hash.hashMatch(password, userData[0].password);
          if (pass) {
            if (userData[0].isActivate == true) {
              // create login token
              const loginToken = JWT.createToken({ id: userData[0]._id });
              //  sesstion user data
              const sessionUser = await User.findById(userData[0]._id).select(
                "-password"
              );
              res.cookie("authToken", loginToken);
              req.session.user = sessionUser;
              new Respons("", "", "/", req, res);
            } else {
              req.session.resentMail = userData[0]._id;
              new Respons("", "Please active your account", "/login", req, res);
            }
          } else {
            new Respons("", "Wrong password", "/login", req, res);
          }
        } else {
          new Respons("", "Email not exist", "/login", req, res);
        }
      }
    }
  } catch (error) {
    new Respons("", error.message, "/login", req, res);
  }
};

/**
 * @name POST
 * @dec  resentMail
 * @access public
 */
const MailResent = async (req, res) => {
  const { id } = req.params;

  try {
    // const UserInfo = await User.find().where("id").equals(id);
    const UserInfo = await User.findById({_id : id})
    
    console.log(UserInfo);
    if (UserInfo) {
      
      const token = JWT.createToken(
        { email : UserInfo.email   },
        1000 * 60 * 60 * 24 * 1
      );
      
      const variedToken = JWT.verifyToken(token);

      if (variedToken) {
        const activateLink = `${process.env.APP_URL}:${process.env.PORT}/activate/${token}`;

        Mail.verifyMail(UserInfo.email, {
          name: UserInfo.name,
          link: activateLink,
        });

        new Respons(
          " please check Email and Your account activate ",
          "",
          "/login",
          req,
          res
        );
      }
    } else {
      new Respons("", "try again later", "/login", req, res);
    }
  } catch (error) {
    new Respons("", error.message, "/login", req, res);
  }
};
/**
 * @name GET
 * @dec  user Logout
 * @access public
 */
const userLogout = (req, res) => {
  try {
    res.clearCookie("authToken");
    delete req.session.user;
    new Respons("Logout succesfull", "", "/login", req, res);
  } catch (error) {
    new Respons("", error.message, "/login", req, res);
  }
};

//   export controllers

export {
  homePage,
  homeLoginPage,
  userLogin,
  userSignup,
  userSignupPage,
  userActiveMail,
  MailResent,
  userLogout,
};
