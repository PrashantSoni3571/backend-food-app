//const { application } = require('express');
const express = require('express');
const userRouter=express.Router();
const{getUser,getAllUser,updateUser,deleteUser}=require('../controller/userController');
//const protectRoute=require('./authHelper');
const{signup,login,isAuthorised,protectRoute,logout}=require('../controller/authController');

// userRouter
// .route('/')
// .get(protectRoute,getUsers)
// .post(postUser)  //path specific middleware
// .patch(updateUser)
// .delete(deleteUser)

// userRouter
// .route("/getCookies")
// .get(getCookies);

// userRouter
// .route("/setCookies")
// .get(setCookies);
// userRouter.route("/:id").get(getUserById);
 

//user options


userRouter
.route('/signUp')
.post(signup)

userRouter
.route('/login')
.post(login)

// userRouter
// .route('/forgetpassword')
// .post(forgetpassword)

// userRouter
// .route('/resetpassword/:token')
// .post(resetpassword)

userRouter
.route('/logout')
.get(logout)

//profile page
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)





//admin specific function

userRouter.use(isAuthorised(['admin']))
userRouter.route('/')
.get(getAllUser)
//userRouter.get('/',isAuthorised(['admin']),getAllUser)
 

userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)
 module.exports=userRouter;

