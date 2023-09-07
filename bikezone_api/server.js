const app = require('./app')
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');


//config env
dotenv.config({ path: "bikezone_api/config/config.env" })

//connection to the database
connectDatabase()


app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});