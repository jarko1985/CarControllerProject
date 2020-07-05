const User = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
//Get all Users
exports.getAllUsers =catchAsync( async(req,res,next)=>{
const allUsers = await User.find();    
res.status(200).json({
status:'Success',
data:{
    allUsers
}
});
});
        
//Add New User
exports.addNewUser = (req,res)=>{
res.status(201).json({
status:'Success',
message:'Create a new User'
});
}
    
//Get User By ID
exports.getUserById = (req,res)=>{
    
res.status(200).json({
status:'Success',
message:'Get User By ID'
}); 
}
    
//Update User By ID        
exports.updateUserrById = (req,res)=>{
    
res.status(200).json({
status:'Success',
message:'Update User By ID'
}); 
}
    
//Dlete User By ID
exports.deleteUserById = (req,res)=>{
res.status(200).json({
status:'Success',
data:null
}); 
}
        