const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
// const JWT_KEY=require('secrets.js');
//const JWT_KEY=require('../secrets.js');
const JWT_KEY = "prashantsoni";
module.exports.getUser = async function getUser(req, res) {
  let token = req.cookies.login;
  let payload = jwt.verify(token, JWT_KEY);
  if (payload.payload != req.body.id) {
    return res.json({ message: "pls search only your profile" });
  }
  let user = await userModel.findById(req.body.id);
  if (user) {
    return res.json(user);
  } else {
    return res.json({
      message: "user not found",
    });
  }
};
// module.exports.postUser=function postUser(req, res) {
//     console.log(req.body);
//     users = req.body;
//     res.json(
//         {
//             message: "data recieved successfully", user: req.body
//         })
// };
module.exports.updateUser = async function updateUser(req, res) {
  //console.log('req.body->', req.body);
  //update data in users obj
  try {
    let id = req.params.id;
    let user = await userModel.findById(id);
    let dataToBeUpdated = req.body;
    if (user) {
      const keys = [];
      for (let key in dataToBeUpdated) {
        keys.push(key);
      }

      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataToBeUpdated[keys[i]];
      }
      const updatedData = await user.save();
      res.json({
        message: "data updated successfully",
        data: user,
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.deleteUser = async function deleteUser(req, res) {
  //users = {};
  try {
    let id = req.params.id;
    let user = await userModel.findByIdAndDelete(id);
    if (!user) {
      res.json({
        message: "user not found",
      });
    }

    res.json({
      message: "data has been deleted",
      data: user,
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};
module.exports.getAllUser = async function getAllUser(req, res) {
  let users = await userModel.find();
  if (users) {
    res.json({
      message: "users recieved",
      data: users,
    });
  }
  res.send("user id recieved");
};

// function setCookies(req,res){
//     // res.setHeader('set-cookie','isLoggedIn=true');
//     res.cookie('iLoggedIn',true);
//      res.send('cookies has been set');

//    }

//  function getCookies(req,res){
//   let cookies=req.cookies;
//   console.log(cookies);
//   res.send('cookies recieved');
//  }
