const app = require('./app')
const dotenv = require('dotenv')


//config env
dotenv.config({path:"bikezone_api/config/config.env"})

 app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
  });