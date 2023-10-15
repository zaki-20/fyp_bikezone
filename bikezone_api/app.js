const express = require('express')
const cookieParser = require("cookie-parser")
const app = express()
const errorMiddleware = require("./middlewares/error")
const cors = require('cors')
const bodyParser = require("body-parser");
const dotenv = require('dotenv');


//config env
dotenv.config({ path: "bikezone_api/config/config.env" })


app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));


// Route Imports
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const orderRoute = require("./routes/orderRoute");
const workshopRoute = require("./routes/workshopRoute");
const rentBikeRoute = require("./routes/rentBikeRoute");
const paymentRoute = require("./routes/paymentRoute");
const blogRoute = require("./routes/blogRoute");


app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", workshopRoute);
app.use("/api/v1", rentBikeRoute);
app.use("/api/v1", paymentRoute);
app.use("/api/v1", blogRoute);


//middleware for error
app.use(errorMiddleware)

module.exports = app