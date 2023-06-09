const express = require("express");
const dotenv = require("dotenv");
//const router = require("./routes/index");
const bootcampRouter = require('./routes/bootcamp');
const courseRouter = require('./routes/courses');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const morgan = require("morgan");
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const fileupload = require('express-fileupload');
const path = require('path');
const cookieParser = require('cookie-parser');

dotenv.config({path: "./config/config.env"});

//connect to db
connectDB();

const app = express();

//Body Parser
app.use(express.json());

// cookie parser
app.use(cookieParser());

//app.use(logger);
//dev loggingmiddleware

//if(process.env.Node_ENV === "development") {
  app.use(morgan('dev'));
//}

//file uploading
app.use(fileupload());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//mount routers
app.use("/api/v1/bootcamps", bootcampRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

//handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`error: ${err.message}`.red);
  //close server & exit process
  server.close(() => process.exit(1));
})