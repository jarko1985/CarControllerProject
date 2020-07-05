const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({path:'./config.env'});

const app = require('./app');



const DB = process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD); 
mongoose.connect(DB,{

useNewUrlParser:true,
useCreateIndex:true,
useFindAndModify:false,
useUnifiedTopology:true


}).then(con=>{
console.log('DATABASE CONNECTION SUCCESSFULL...!!!');
});
const port =process.env.port||3000;
app.listen(port,()=>{
    console.log(`Server started on Port ${port}`);
});

