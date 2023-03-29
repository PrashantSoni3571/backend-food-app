let SK="pk_test_51MpePLSAGHCFWhSv91QMUMC8DkMFpPMWbE6nTUkFiOq7QTRoUyctkuumcIKhpzdfteZDbLaJOKJ4g6raJnLzPwVY00YgL9SIxj"
const stripe=require('stripe')/(SK);
const planModel = require("../models/planModel");
const userModel = require("../models/userModel");
module.exports.createSession=async function createSession(req, res) {
    try{
        let userId=req.id;
        let planId=req.params.id;
        const user =await userModel.findById(userId);
        const plan = await planModel.findById(planId);

        const session = await stripe.checkout.sessions.create({
            Payment_method_types:['card'],
            customer_email:user.email,
            client_refernce_id:plan.id,
            line_items:[
                {
                      name:plan.name,
                      descryption:plan.descryption,
                      amount:plan.price * 100,
                      currency:'inr',
                      quantity: 1


                }
            ],
            success_url: `${req.protocol}://${req.get{"host"}}/profile`,
            cancel_url: `${req.protocol}://${req.get{"host"}}/profile`
})
res.status(200).json({
    status:"success",
    session
})
        } catch (err) {
            res.status(200).json({
                err: err.message
            })
             }};
            
