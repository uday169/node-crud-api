const express = require('express');
const bodyParser = require('body-parser');
require('express-async-errors');
// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const mongoDBErrors = require('mongoose-mongodb-errors')

mongoose.Promise = global.Promise;
mongoose.plugin(mongoDBErrors);
// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Require Employees routes
require('./app/routes/employee.routes.js')(app);

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome"});
});

app.use((req ,res,next) =>{
    req.status = 404;
    const error = new Error("Route not found");
    next(error);
});

app.use((error,req,res,next) => {
    res.status(req.status || 500).send({
        message:error.message
    });
});

// listen for requests
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on port 3000");
});
