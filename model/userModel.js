const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto'); 


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'a user must have a name'],
        trim:true,
    },
    email:{
        type:String,
        required:[true,'a user must have an email'],
        unique:true,
        validate:[validator.isEmail,'please provide valid email']
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    photo:{
        type:String
    },
    password:{
        type:String,
        required:[true,'please provide valid password'],
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true,'Please confirm your password'],
        validate:{
            validator:function(el){
                return el === this.password;
            }
        }
    },
    passwordResetToken:String,
    passwordResetExpires:Date,
});



userSchema.pre('save',async function(next){

if(!this.isModified('password')) return next();    

this.password = await bcrypt.hash(this.password,12);

this.passwordConfirm = undefined;
next();
});



userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword)
    {
    return await bcrypt.compare(candidatePassword,userPassword);
    }




userSchema.methods.changedPasswordAfter = function(JWTTimeStamp){

if(this.passwordChangedAt){
const changedTimeStamp =parseInt(this.passwordChangedAt.getTime()/1000,10);
console.log(changedTimeStamp,JWTTimeStamp);
return JWTTimeStamp<changedTimeStamp;
}
return false;
}




userSchema.methods.createPasswordResetToken = function(){

const resetToken = crypto.randomBytes(32).toString('hex');
    
    this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
    
console.log({resetToken},this.passwordResetToken);
    
this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    
return resetToken;
}
    
    
        

const User = mongoose.model('User',userSchema);

module.exports = User;



