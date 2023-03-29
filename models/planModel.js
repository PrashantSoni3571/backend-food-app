const mongoose=require('mongoose');

mongoose.set('strictQuery', true);
const db_link ='mongodb+srv://admin:f0Z6ibEsMZdPFNGT@cluster0.rkuhuch.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log(' plan db connected');;
})
.catch (function(err){
    console.log(err);
});

const planSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxlength:['20','plan name should not exceed more than 20 characters']
    },
    duration:{
        type:Number,
        reuired:true
    },
    price:{
        type:Number,
        reqiured:[true,'price not entered']
    },
    ratingsAverage:{
        type:Number
    },
    discount:{
        type:Number,
        validate:[function(){
            return this.discount<100,'discount should not exceed price'}]
        

    }
    }



);
const planModel=mongoose.model('planModel',planSchema);

//  (async function createPlan(){
    // let planObj={
    //     name:'superfood3',
    //     duration: 30,
    //     price:1000,
    //     ratingsAverage:5,
    //     discont:20
    // }

//     let data=await planModel.create(planObj);
//     console.log(data);} )();


//model

// (async function createUser(){
module.exports=planModel;
