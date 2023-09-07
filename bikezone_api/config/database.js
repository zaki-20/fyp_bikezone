
const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose
        .connect(process.env.MONGO_URL)
        .then((data) => {
            console.log(`Connected to MongoDB ${data.connection.host}`);
        })
}

module.exports = connectDatabase