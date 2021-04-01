const mongoose = require('mongoose');
const { mongoUrl } = require('./index');

//Mongoose and CORS configuration 
module.exports = {
    initializeDB: async () => {
        mongoose.connect(mongoUrl,
            {useNewUrlParser: true, useUnifiedTopology: true },
            (data)=>{console.log("Database connection established ? : "+data)}
        );
        mongoose.Promise = global.Promise;
    },
 
    cors: async (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
        if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
        }
        next();
    }
}
