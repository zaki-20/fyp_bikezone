const express = require('express')
const cookieParser = require("cookie-parser")
const app = express()
const errorMiddleware = require("./middlewares/error")


app.use(express.json());
app.use(cookieParser())



// Route Imports
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");


app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute)


//middleware for error
app.use(errorMiddleware)

module.exports = app