const calendarModel = require("../models/calendar");
const serviceModel = require("../models/service");
const serviceAdModel = require("../models/serviceAd");
const designModel = require("../models/design");
const userModel = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cmdColor = require("chalk");

exports.getToken = (req, res) => {
  let data = { csrfToken: req.csrfToken() };
  console.log(data);
  return res.json(data);
};

exports.getCalendar = (req, res) => {
  calendarModel
    .find({})
    .lean()
    .exec((err, calendar) => {
      res.send(calendar);
      if (err) {
        console.log(err);
      }
    });
};

exports.getService = (req, res) => {
  //console.log(req);
  serviceModel
    .find({})
    .lean()
    .exec((err, service) => {
      res.send(service);
      if (err) {
        console.log(err);
      }
    });
};

exports.getServiceAd = (req, res) => {
  serviceAdModel
    .find({})
    .lean()
    .exec((err, serviceAd) => {
      res.send(serviceAd);
      if (err) {
        console.log(err);
      }
    });
};

exports.getDesign = (req, res) => {
  designModel
    .find({})
    .lean()
    .exec((err, design) => {
      res.send(design);
      if (err) {
        console.log(err);
      }
    });
};

exports.singin = (req, res) => {
  userModel.findOne({ email: req.body.email }, (err, users) => {
    if (err) {
      return res.status(200).json({
        error: "error",
      });
      console.log("err - err");
    }
    console.log(users);
    if (users) {
      console.log("err - users");
      return res.status(401).json({
        error: "error",
      });
    }

    console.log("gut");
    console.log(req.body);
    let user = new userModel();
    let salt = bcrypt.genSaltSync(10);
    user.email = req.body.user.email;
    user.login = req.body.user.login;
    user.pass = bcrypt.hashSync(req.body.user.pass, salt);
    user.save().then((savedU) => {
      console.log(savedU._id);
      let token = jwt.sign({ userId: savedU._id }, "sasdfgfbBBcsgASDt123", {
        expiresIn: 604800, // 1 week
      });
      res.status(200).json({
        token: token,
      });
    });
  });
};

exports.userService = (req, res) => {
  //console.log(req.body);
  let token = req.body.token;
  jwt.verify(token, "sasdfgfbBBcsgASDt123", async (err, decoded) => {
    //console.log(decoded);
    let user = await userModel.findOne({ _id: decoded.userId });
    console.log(cmdColor.blue("finded User"));
    console.log(user);
    res.status(200).send();
  });
};

exports.user = (req, res) => {
  let token = req.headers.token;
  jwt.verify(token, "sasdfgfbBBcsgASDt123", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        error: "not authorizired",
      });
    }
    console.log(decoded);
    userModel
      .findOne({ _id: decoded.userId })
      .lean()
      .exec((err, user) => {
        console.log(err);
        console.log(user);
        if (!err) {
          return res.status(200).json({
            login: user.login,
          });
        }
      });
  });
};

exports.singup = (req, res) => {
  userModel.findOne({ login: req.body.user.login }, (err, user) => {
    if (err) {
      return res.status(404).json({
        error: "server_error",
      });
    }
    if (!user) {
      return res.status(401).json({
        error: "not_found",
      });
    }
    if (user) {
      bcrypt.compare(req.body.user.pass, user.pass, (err, match) => {
        if (match) {
          let token = jwt.sign({ userId: user._id }, "sasdfgfbBBcsgASDt123", {
            expiresIn: 604800, // 1 week
          });
          res.status(200).json({
            token: token,
          });
        } else {
          res.status(401).json({ error: "password" });
        }
      });
    }
  });
};
