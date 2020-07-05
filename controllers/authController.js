const User = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appError');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const sendEmail = require('./../utils/email');
const crypto = require('crypto');



const signToken = id =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (user,statusCode,res) =>{
    const token = signToken(user._id);
    const cookieOptions = {
        expires:new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
         
        httpOnly:true  
    }

    if(process.env.NODE_ENV === 'production') cookieOptions.secure = true; 
    res.cookie('jwt',token,cookieOptions);
    user.password = undefined;
    res.status(statusCode).json({
        status:'Success',
        token,
        data:{
         user
        }
    });
}



//signup function
exports.signUp = catchAsync( async (req,res,next) =>{
    const newUser = await User.create({
        name:req.body.name,  		
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm,
        role: req.body.role
    });
    createSendToken(newUser,201,res);
});


//login function
exports.logIn =catchAsync(async (req,res,next)=>{
const {email,password} = req.body;
if( !email || !password){
    return next(new appError('Please provide email and password',400));
}
const user =await User.findOne({email}).select('+password');
if( !user || !(await user.correctPassword(password,user.password))){
    return next(new appError('Incorrect Email or password',401));
}
createSendToken(user,200,res);
});



//protect Routes
exports.protect = catchAsync(async(req,res,next)=>{
//getting token and check if it exists
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token = req.headers.authorization.split(' ')[1];
    } else if(req.cookies.jwt){
        token = req.cookies.jwt;
    }
    if(!token){
    return next(
    new appError('you are not logged in!! please log in to get access',401)
    );
    }
//verification token
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
//check if user still exists
    const freshUser = await User.findById(decoded.id);
    if(!freshUser){
    return next(
    new appError('the token belonging to this user does not longer exists',401));
    }
    if(freshUser.changedPasswordAfter(decoded.iat)){
    return next(
    new appError('User Recently Changed password, please login again',401)
    );
    }
//GRANT ACCESS TO PROTECTED ROUTE
    req.user = freshUser;
    next();
    });



exports.isLoggedIn = catchAsync(async(req,res,next)=>{

    if(req.cookies.jwt){
            
    const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
    //check if user still exists
    const freshUser = await User.findById(decoded.id);
    if(!freshUser){
    return next();
    }
    if(freshUser.changedPasswordAfter(decoded.iat)){
    return next();
    }
    res.locals.user = freshUser;
    return next();

    }
    next();
    });    
    

//restrict Route
    exports.restrictTo = (...roles)=>{
        return (req,res,next)=>{
            if(!roles.includes(req.user.role)){
                return next(
                    new appError('You dont have permission to perform this action',403)
                );
            }

            next();
        }
    }

//forgot password
exports.forgotPassword =catchAsync(async(req,res,next)=>{

const user = await User.findOne({email:req.body.email});
if(!user){
    return next(
        new appError('User Does not exist',404)
    );
}
const resetToken = user.createPasswordResetToken(); //created in userModel.js
await user.save({validateBeforeSave:false});

const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

const message = `forgot your password? submit a patch request with your new password and password confirm to ${resetURL}`;

try{

await sendEmail({
    email:req.body.email,
    subject: 'password reset token valid for 10 minutes',
    message
    });

res.status(200).json({
    status:'Success',
    message:'Token sent to email'
    });
}

catch(err){
user.passwordResetToken = undefined;
user.passwordResetExpires = undefined;
await user.save({validateBeforeSave:false}); 

return next(
new appError('there was an error sending the email....please try again later...',500)
);
}

});


//reset password
exports.resetPassword =catchAsync( async(req,res,next)=>{
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        passwordResetToken:hashedToken,
        passwordResetExpires:{$gt:Date.now()}
    });

    if(!user){
        return next(
            new appError('Token is invalid or expired',400)
        );

        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
    }
    createSendToken(user,200,res);
});


exports.updatePassword =catchAsync(async(req,res,next) =>{
    
    const user = await User.findById(req.user.id).select('+password');
    console.log(user);
    if(!(await user.correctPassword(req.body.passwordCurrent,user.password))){
        return next(
            new appError('your current password is incorrect',401)
        ); 
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();


    createSendToken(user,200,res);
});