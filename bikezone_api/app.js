const express = require('express')
const cookieParser = require("cookie-parser")
const app = express()
const errorMiddleware = require("./middlewares/error")
const cors = require('cors')
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(cors())
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());



// Route Imports
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const workshopRoute = require("./routes/workshopRoute");
const rentBikeRoute = require("./routes/rentBikeRoute");


app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", workshopRoute);
app.use("/api/v1", rentBikeRoute);


//middleware for error
app.use(errorMiddleware)

module.exports = app