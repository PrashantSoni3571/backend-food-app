const express = require('express');
const { stubTrue } = require('lodash');

const app = express();
const cookieParser=require('cookie-parser');
//middleware dunc=> post, front->json

app.use(express.json());  //global middleware
app.listen(3000);
app.use(cookieParser());

const userRouter=require('./Routers/userRouter');
//const authRouter=require('./Routers/authRouter');
const planRouter=require('./Routers/planRouter');
const reviewRouter=require('./Routers/reviewRouter');
//base route,route to use
app.use('/user',userRouter);  //global middleware
//app.use('/auth',authRouter);
app.use('/plans',planRouter);
app.use('/review',reviewRouter);




  