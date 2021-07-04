//Connecting to database
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
mongoose.connect(process.env.database,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true ,
    useCreateIndex:true ,
    useFindAndModify:false
 });
 
mongoose.connection.once('open',()=>{
    console.log("DATABASE CONNECTED");
}).on('error',(error)=>{
    console.log(`Database connection error :${error}`);
})

module.exports = mongoose;