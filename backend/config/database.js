const mongoose  = require('mongoose')


// const mongoURI = `mongodb://localhost:27017/${process.env.DATABASE}?readPreference=primary&appname=MongoDB%20Compass&ssl=false`
// const connectToMongo = () =>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("connected to mongo")
//     })
// }

const connectToMongo = () =>{
mongoose.connect(process.env.DB_URI,{
    useUnifiedTopology:true}).then((data)=>{
    console.log(`Mongo db connected with server: ${data.connection.host}`);
})
}

module.exports = connectToMongo;