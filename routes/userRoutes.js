import express from "express";
import {
    homeLoginPage,
    homePage,
    MailResent,
    userActiveMail,
    userLogin,
    userLogout,
    userSignup,
    userSignupPage,
  } from "../controller/userControllers.js";
import authRedirectMiddle from "../middleweres/authRedirectMiddle.js";
import verifyMiddlewares from "../middleweres/verifyMiddleweres.js";


// routing init
const router= express.Router();

// home page
router.get("/",authRedirectMiddle, verifyMiddlewares, homePage);
// login page
router.get("/login", homeLoginPage);
// login user
router.post("/login", userLogin);

// veary email
//  user sign up page
router.get("/signUp", userSignupPage);
//  user sign up
router.post("/signUp", userSignup);
// active account mail
router.get("/activate/:token", userActiveMail);
// resent active mail
router.get("/resentmail/:id", MailResent);
// logout
router.get('/logout',userLogout)



export default router