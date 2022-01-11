const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const useJWTToken = require("../utils/jwttoken");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto")
const cloudinary = require('cloudinary')

//Register a User
exports.registerUser = catchAsyncError( async(req,res,next) =>{
    
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{ folder: "avatar", width: 150,crop:"scale"})

    const {name,email,password} = req.body;
    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }
    })

    useJWTToken(user,201,res)  
})

exports.loginUser = catchAsyncError(async(req,res,next) =>{
    const {email,password} =req.body;

    //checking if user has given password and email both
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400))
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    useJWTToken(user,201,res)  

})


//logout

exports.logout = catchAsyncError(async(req,res,next) =>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

//forgot password

exports.forgotPassword = catchAsyncError(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("User not found",404));
    }

    //get reset password token
    const resetToken = user.getResetPasswordToken()

    await user.save({validateBeforeSave: false});

    //const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/password/reset/${resetToken}`

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
    const message = `Your password reset token is : \n \n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it `;

    try {
        await sendEmail({
            email: user.email,
            subject: 'MaiMart password recovery',
            message,
        })
        res.status(200).json({
            success:true,
            message: `Email sent to ${user.email} successfully`
        })

    } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    await user.save({validateBeforeSave: false});

    return next(new ErrorHandler(error.message,500))
   }
})

//reset password

exports.resetPassword = catchAsyncError(async(req,res,next)=>{
  
    //hashing token
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({resetPasswordToken,resetPasswordExpire:{ $gt: Date.now()}})

    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or has been expired",400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("password does not matched ",400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save()

    useJWTToken(user,200,res);
})


//Get user details

exports.getUserDetails = catchAsyncError(async(req,res,next)=>{

    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user,
    })
})

//update password

exports.updatePassword = catchAsyncError(async(req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatch){
        return next(new ErrorHandler("old password is incorrect",400))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("password does not match",400))
    }

    user.password = req.body.newPassword;

    user.save()

    useJWTToken(user,200,res);
})

//update profile

exports.updateProfile = catchAsyncError(async(req,res,next)=>{

    const newUserProfile ={
        name: req.body.name,
        email: req.body.email
    }

    if(req.body.avatar !== ""){
        let user = await User.findById(req.user.id)
        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,
            { folder: "avatar", width: 150,crop:"scale"})

        newUserProfile.avatar = {
            public_id:myCloud.public_id,
            url:myCloud.secure_url,
        }

    }

    //we will add cloudinary later

     let user = await User.findByIdAndUpdate(req.user.id, newUserProfile,{
        new:true,
        runValidators:true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

//get all users

exports.getAllUsers = catchAsyncError(async(req,res,next)=>{

    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

//get single users (admin)

exports.getSingleUser = catchAsyncError(async(req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with id ${req.params.id}`,404));
    }

    res.status(200).json({
        success: true,
        user
    })
})

//update role (admin)

exports.updateUserRole = catchAsyncError(async(req,res,next)=>{

    const newUserProfile ={
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserProfile,{
        new:true,
        runValidators:true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
        user
    })
})

//delete user (admin)

exports.deleteUser = catchAsyncError(async(req,res,next)=>{

    const user = await User.findById(req.params.id)

    //we will remove cloudinary later
    

    if(!user){
        return next(new ErrorHandler(`User does not exist with id ${req.params.id}`,404));
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();
    

    res.status(200).json({
        success: true
    })
})