const express = require('express');
const carRouter = require('./routes/carRoutes');
const userRouter = require('./routes/userRoutes');
const path = require('path');
const bodyParser = require('body-parser');
const viewRouter = require('./routes/viewRoutes');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');


const app = express();
app.use(cors({origin: 'https://localhost:3000',credentials:'true'}));



//security http headers
app.use(helmet());

//Global MiddleWares
//limit requests from api
// const limiter = rateLimit({
//     max:100,
//     windowMs: 60* 60 * 1000,
//     message:'Too Many Requests from this ip address...please try again within 1 hour'
// });

//app.use('/',limiter);



//setting view Engine
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));



//http car handle methods:
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

//Data Sanitization Against NoSql query injections
app.use(mongoSanitize());

//Data Sanitization Against XSS
app.use(xss());

//prevent parameter pollution
app.use(hpp());

app.use('/cars',carRouter);
app.use('/users',userRouter);
app.use('/',viewRouter);

module.exports = app;
