const express= require("express");
const planRouter = express.Router();
const {protectRoute, isAuthorised}=require('../controller/authController')
const{getPlan,updatePlan,deletePlan,getAllPlans,createPlan,top3Plans}=require('../controller/planController')
// basic all palns
planRouter.route('/allPlans')
.get(getAllPlans)


//own plan -> logged in necessary
planRouter.use(protectRoute);
planRouter.route('/plan/:id')
.get(getPlan)

// admin and restaurantowner can only create update and change plans
planRouter.use(isAuthorised(['admin','restaurantowner']));
planRouter
.route('/crud/:Plan')
.post(createPlan)

planRouter
.route('/crudPlan/:id')
 .patch(updatePlan)

 planRouter
.route('/crudPlan/:id')
 .delete(deletePlan)


 planRouter
 .route('/top3')
 .get(top3Plans)

module.exports=planRouter;


