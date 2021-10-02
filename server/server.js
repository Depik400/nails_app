const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const csurf = require("csurf");
const db = require("./models/db");
const apiRouter = require("./routers/index");

const app = express();
const csrfProtection = csurf({ cookie: false });
app.use((req,res,next)=>{res.setHeader('Access-Control-Allow-Private-Network',true); next();})
app.use(express.urlencoded({ extends: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:8080", "http://192.168.0.62:8080"],
    credentials: true,
    exposedHeaders:['set-cookie']
  })
);
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    name: "test",
    httpOnly: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(csrfProtection);
app.use(apiRouter);

mongoose.connect(db.connectionString);

app.listen(3000, () => {
  console.log("server on");
});
