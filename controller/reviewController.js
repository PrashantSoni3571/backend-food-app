const reviewModel=require('../models/reviewModel')
const planModel=require('../models/planModel')

module.exports.getAllReviews=async function getAllReviews(req,res){
    try{
        console.log("entered in try");
        const reviews=await reviewModel.find();
        console.log("asgdis");
        if(reviews){
            return res.json({
                message:"reviews retrieved",
                data:reviews
            })
        }
        else{
            return res.json({
                message:'review not found'
            })
        }
    }
    catch(err){
        return res.json({
            message:'error mhsabd'
        })
    }
}

module.exports.top3reviews=async function top3reviews(req,res){
    try{
        const reviews=await reviewModel.find().sort({
            rating:-1
        }).limit(3) ;
        if(reviews){
            return res.json({
                message:"reviews retrieved",
                data:reviews
            })
        }
        else{
            return res.json({
                message:'review not found'
            })
        }
    }
    catch(err){
        return res.json({
            message:'review not found'
        })
    }
}


module.exports.getPlanReviews=async function getPlanReviews(req,res){
    try{
        //plan click -> corresponding jitne bhi reviews h wo leke aane h
        let planid=req.params.id;
        let reviews=await reviewModel.find();
        reviews=reviews.filter(review => review.plan.__id==review.planid);
        return res.json({
            message:'review retrieved for a particular plan successful' , data:reviews
        })
    }
    catch(err){
        return res.json({
            message:'review not found'
        })
    }
}

module.exports.createReview=async function createReview(req,res){
    try{   
    let id =req.params.plan;
    let plan =await planModel.findById(id);
    let review= await reviewModel.create(req.body);
    plan.ratingsAverage=(plan.ratingsAverage + req.body.rating)/2
    await plan.save();
    res.json ({
        message:"review created ", data:review 
    });}
    catch(err){
        return res.json({
            message:'error cannot create review' 
        })
    }
} 
module.exports.updateReview= async function updateReview(req,res){
try{ 
    let planid=req.params.plan;
   //review id from frontend
   let id=req.body.id;
let dataToBeUpdated = req.body;
//console.log(dataToBeUpdated);
let keys = [];
for (let key in dataToBeUpdated) {
    if(key==='id') continue;
  keys.push(key);
}
let review = await reviewModel.findById(id);
for (let i = 0; i < keys.length; i++) {
  review[keys[i]] = dataToBeUpdated[keys[i]];
}
//console.log(plan);
await review.save();
 return res.json({
    message:'review updated successfully', data:review
});
} catch (err) {
res.status(500).json({ message: err.message });
}
}
module.exports.deleteReview=async function deleteReview(req,res){
    try{   
    let planid =req.params.plan;
    let id=req.body.id;
    let review= await reviewModel.findByIdAndDelete(id);
    
    res.json ({
        message:"review deleted ", data:review 
    });}
    catch(err){
        return res.json({
            message:'err.message' 
        })
    }
} 