const express = require("express");

const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
// const JWT_KEY=require('secrets.js');
//const JWT_KEY=require('../secrets.js');
const JWT_KEY = "prashantsoni";
//signup user
module.exports.signup = async function Signup(req, res) {
  try {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    if (user) {
      return res.json({
        message: "user signed up",
        data: user,
      });
    } else {
      req.json({
        meassage: "error while sigmimg up",
      });
    }
  } catch (err) {
    message: err.message;
  }
};

//login user
module.exports.login = async function login(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      if (user) {
        //bcrypt -> compare

        if (user.password == data.password) {
          let uid = user["_id"]; //payload
          let token = jwt.sign({ payload: uid }, JWT_KEY);
          res.cookie("login", token, { httpOnly: true });
          return res.json({
            message: "user logged in",
            userDetails: data,
          });
        } else {
          return res.json({
            message: "wrong credentials",
          });
        }
      } else {
        return res.json({
          message: "user not found",
        });
      }
    } else {
      return res.json({
        message: "empty field foundd",
      });
    }
  } catch (err) {
    return res.json({
      messge: err.message,
    });
  }
};

// authorise function == to check the user's role (whethere it is admin , user ,delivery or restaurantowner)

module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
    if (roles.includes(req.role) == true) {
      next();
    } else {
      res.status(401).json({
        message: "operataion not allowed",
      });
    }
  };
};

//protect route

module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    let token;
    if (req.cookies.login) {
      token = req.cookies.login;
      let payload = jwt.verify(token, JWT_KEY);
      if (payload) {
        const user = await userModel.findById(payload.payload);
        req.role = user.role;
        req.id = user.id;
        next();
      } else {
        return res.json({
          message: "user not verified",
        });
      }

      // if(payload)
      // next();
      // else{
      //     return res.json({
      //     message:'user not verified'
      //     })}
    } else {
      browser;
      const client = req.get("user-agent");
      if (client.includes("mozilla") == true) {
        return res.redirect("/login");
      } else {
        //postman
        return res.json({
          message: "pls loggin first",
        });
      }
    }
  } catch (err) {
    message: err.meassage;
  }
};
//forget password

// module.exports.forgetpassword=async function forgetpassword(req,res){
//     let{email}=req.body;
//     try{
//         const user=await userModel.findOne({email:email});
//         if(user){
//         const resetToken=user.createResetToken();
//         hhtp://abc.com/resetpassword/resetToken
//         let resetPasswordLink=`${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`
//         //send email to the user
//         //nodemailer
//     }
//     else{
//         return res.json({
//             message:"pls signup"
//         })
//     }}

//    catch(err){
//     return res.status(500).json({
//         message:err.meassage
//     })
//    }

// }

//resetpassword
module.exports.resetpassword = async function resetpassword(req, res) {
  try {
    const token = req.params.token;
    let { password, confirmPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      //resetPassword will update user in db
      user.resetPasswordHandler(password, confirmPassword);
      await user.save();
      res.json({
        message: " password changed successfully pls login again",
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.meassage,
    });
  }
};
module.exports.logout = function logout(req, res) {
  res.cookie("login", " ", { maxage: 1 });
  res.json({
    message: "user logged out successfully",
  });
};
