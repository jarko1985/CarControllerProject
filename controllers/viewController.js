const Car = require('./../model/carModel');
const catchAsync = require('../utils/catchAsync');
const slug = require('slug');
const Nexmo = require('nexmo');
const messagebird = require('messagebird')('RwOQ6m0imbscY5yIc2E2poN5c');


const nexmo = new Nexmo({
    apiKey:'27991edb',
    apiSecret:'rMoN6p61vQMbzX8c'
},{degug:true})

exports.getOverView =catchAsync(async(req,res,next)=>{
    //1-get Data from Collection
    const cars = await Car.find();
    res.status(200).render('overview',{
        title:'All Cars',
        cars
        });
    });



    exports.getCarView =catchAsync(async(req,res,next)=>{

    const car = await Car.findOne({slug:req.params.slug});
    res.status(200).render('car',{
        title:`${car.slug}`,
        car
        });
    });
    
    



exports.getSms = catchAsync(async(req,res)=>{
const number = req.body.number;
const text = req.body.text;

const params = {
  'originator': '+971509518842',
  'recipients': [
      number
        ],
  'body': text
        };
messagebird.messages.create(params,function(err,response){
  if(err){
    return console.log(err);
          }
console.log(response);
    })
    });





//LogIn View    
exports.getLoginForm = catchAsync(async(req,res)=>{
res.status(200).render('login',{
  title:'login to your account'
})
})