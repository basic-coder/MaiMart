const app = require('./app')
const connectToMongo = require('./config/database')
const cloudinary = require('cloudinary')

//uncaught exception 
process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down server due to uncaughtException');
    process.exit(1);
})

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }

//connecting database

connectToMongo()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`);
})

process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`);
    console.log('Shutting down server due to unhandled promise rejection');

    server.close(()=>{
        process.exit(1);
    })
})