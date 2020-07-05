const Car = require('../model/carModel');
const catchAsync = require('../utils/catchAsync');

//Get all Cars
exports.getAllCars =async(req,res)=>{
try{
const allCars = await Car.find();
res.status(200).json({
status:'Success',

result:allCars.length,
data:{
allCars  
}
});
}catch(err){
res.status(404).json({
status:'Fail',
message:err
});
}
}
    
//Add New Car
exports.addNewCar =catchAsync(async (req,res)=>{
const myCar = await Car.create(req.body);
console.log(Car);
res.status(201).json({
status:'Success',
data:{
    myCar
}
});
console.log(myCar);

});

//Get Car By ID
exports.getCarById = async(req,res)=>{
    try{
   const getOneCar =await Car.findById(req.params.id);     
   res.status(200).json({
    status:'Success',
   data:{
       getOneCar
   }
   }); 
}catch(err){
    res.status(404).json({
        status:'Fail',
        message:err
    })
}
}

    
exports.updateCarById = async (req,res)=>{
    try{
const updatedCar = await Car.findByIdAndUpdate(req.params.id,req.body,{
 new:true,
 runValidators:true   
});
res.status(200).json({
    status:'Success',
    data:{
      updatedCar
        }
    }); 
}catch(err){
res.status(404).json({
    status:'Fail',
    message:err
        })
    }
}

//Dlete Car By ID
exports.deleteCarById = async (req,res)=>{
    try{   
    await Car.findByIdAndDelete(req.params.id);         
    res.status(204).json({
        status:'Success',
        data:null
       }); 
    }catch(err){
        res.status(404).json({
            status:'Fail',
            message:err
                })
            }
}
    