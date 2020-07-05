const mongoose = require('mongoose');
const slugify = require('slugify');
const carSchema = new mongoose.Schema({
    plateNo:{
        type:String,
        unique:true,
        trim:true,
        required:[true,'A Car must have a plate Number..!!']
    },
    slug:String,
    gsmId:{
        type:String
    },
    issuingEmirate:{
        type:String,
        required:[true,'A Plate must have an Issuing Emirate..!!']
    },
    owner:{
        type:String,
        required:[true,'A Car must have an Owner..!!']
    },
    latitude:{
        type:Number,
        trim:true
    },
    longitude:{
        type:Number,
        trim:true
    },
    photo:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    locations:[
    
        {
            type:{
                type:String,
                default:'point',
                enum:['point']
            },
            coordinates:[Number],
        }
    ]
    
});


carSchema.pre('save',function(next){
    this.slug = slugify(this.gsmId);
    next();
})


const Car = mongoose.model('Car',carSchema);
module.exports = Car;