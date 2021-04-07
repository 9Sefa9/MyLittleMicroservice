const mongoose = require('mongoose');
const { mongoUrl } = require('./index');

function createDBConnection(){
    mongoose.connect(mongoUrl,
        {useNewUrlParser: true, useUnifiedTopology: true },
        (data)=>{console.log("Database connection established ? : "+(data==null))}
    );
    mongoose.Promise = global.Promise;
}
module.exports = createDBConnection;