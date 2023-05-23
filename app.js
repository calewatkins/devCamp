const express = require("express");
const dotenv = require("dotenv");
const router = require("./routes/index");
const morgan = require("morgan");
dotenv.config({path: "./config/config.env"});

const app = express();

//app.use(logger);
//dev loggingmiddleware

//if(process.env.Node_ENV === "development") {
  app.use(morgan('dev'));
//}

//mount routers
app.use("/api/v1", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running  in ${process.env.NODE_ENV} mode on port ${PORT}`));