// file include
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import expressLayout from "express-ejs-layouts";
import mongDBConnect from "./config/db.js";
import router from "./routes/userRoutes.js";
import localsMiddle from "./middleweres/localsMiddlewere.js";

// environtment setup

dotenv.config();
const PORT = process.env.PORT || 9090;

// EXPRESS INIT
const app = express();

// express sessioin
app.use(
  session({
    secret: "We love Blockchain",
    resave: false,
    saveUninitialized: true,
  })
);

mongoose.set("strictQuery", true);

// locals middleweres
app.use(localsMiddle);

// middlewere
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// static folder
app.use(express.static("public"));

// ejs init
app.set("view engine", "ejs");
app.use(expressLayout);
app.set("layout", "layouts/app");

// routing
app.use("/", router);

// server listen
app.listen(PORT, () => {
  mongDBConnect();
  console.log(`Server runing on port ${PORT} `.bgGreen.black);
});
