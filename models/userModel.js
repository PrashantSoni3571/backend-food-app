
const mongoose=require('mongoose');
const emailValidator=require('email-validator');
const bcrypt=require('bcrypt');
const crypto=require('crypto');
mongoose.set('strictQuery', true);
const db_link ='mongodb+srv://admin:f0Z6ibEsMZdPFNGT@cluster0.rkuhuch.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log('db connected');;
})
.catch (function(err){
    console.log(err);
});

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }

        

    },
    password:{
        type:String,
        required:true,
        minlength:8

    },
    confirmPassword:{
        type:String,
        required:true,
        minlength:8,
        validate:function(){
            return this.confirmPassword=this.password;
        }
       

    },
    role:{
        type:String,
        enum:['admin','user','restaurantowner','deliveryboy'],
        default:'user'
    },
    
        profileImage:{
            type:String,
            default:'img/users/default.jpeg'

        },
    resetToken:String   
    

});

userSchema.methods.createResetToken=function(){
//creating unique token using npim icrypto
const resetToken=crypto.randomBytes(32).toString("hex");
this.resetToken=resetToken;
return resetToken;
}

userSchema.methods.resetPasswordHandler=function
(password,confirmPassword){
    this.password=password;
    this.confirmPassword=confirmPassword;
    this.resetToken=undefined;
}

// userSchema.pre('save',async function(){
//     let salt= await bcrypt.genSalt(); 
//     let hashedString=await bcrypt.hash(this .password,salt);
//    this.password=hashedString;
//    this.confirmPassword=hashedString;
// })
 

//model

const userModel=mongoose.model('userModel',userSchema);
// (async function createUser(){
module.exports=userModel;
