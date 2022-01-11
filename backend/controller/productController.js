const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require('cloudinary')
//Create product 
exports.createProduct = catchAsyncError(async(req,res,next) =>{

    let images = [];

    if(typeof req.body.images === "string"){
        images.push(req.body.images)
    }else{
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i],{
            folder: 'products'
        });

        imagesLinks.push({
            public_id : result.public_id,
            url : result.secure_url
        })
        
    }
    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
})

//Get all products
exports.getAllproducts = catchAsyncError(async (req,res,next) =>{

    // return next(new ErrorHandler("this is temp error",500))
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage)

    const products = await apiFeature.query;
    res.status(201).json({
        success:true,
        products,
        productsCount,
        resultPerPage,

    })
})

//Get all products(admin)
exports.getAdminproducts = catchAsyncError(async (req,res,next) =>{

    const products = await Product.find();
    res.status(201).json({
        success:true,
        products
    })
})

//single product details
exports.getProductDetails = catchAsyncError(async(req,res,next) =>{
    const product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product not Found",404))
    }
    res.status(200).json({
        success:true,
        product
    })
})

//Update Product == Admin
exports.updateProduct = catchAsyncError(async(req,res,next) =>{
    let product = Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not Found",404))
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true
    })
})


//Delete product
exports.deleteProduct = catchAsyncError(async(req,res,next) =>{
    const product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product not Found",404))
    }

     // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

    await product.remove();
    res.status(200).json({
        success:true,
        message: 'Product Delete Success'
    })
})

//create new review or update the review
exports.createProductReview =  catchAsyncError(async(req,res,next) =>{
    
    const {rating,comment,productId} = req.body
    const review ={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString())
    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString()===req.user._id.toString())
                (rev.rating = rating),(rev.comment = comment)
        })
    }else{
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length;
    }

    let avg=0

    product.ratings = product.reviews.forEach(rev=>{
        avg+=rev.rating
    })

    product.ratings = avg / product.reviews.length

    await product.save({ validateBeforeSave: false})

    res.status(200).json({
        success:true
    })
})

// get all reviews of a product

exports.getProductReviews = catchAsyncError(async(req,res,next) =>{
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not Found",404))
    }
    res.status(200).json({
        success:true,
        reviews: product.reviews
    })
})

//delete review
exports.deleteReview = catchAsyncError(async(req,res,next) =>{
    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not Found",404))
    }

    const reviews = product.reviews.filter((rev)=> rev._id.toString() !== req.query.id.toString())
    // console.log(req.query.id.toString());
    // console.log(product.reviews);
    let avg=0
    
    
    reviews.forEach((rev)=>{
        avg+=rev.rating;
    });
    
    let ratings = 0;

    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews
        },
        {
            new: true,
            runValidators:true,
            useFindAndModify:false
        }
    )
    
    
    res.status(200).json({
        success:true,
    })
})
