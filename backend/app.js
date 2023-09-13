// load all the modules to use 
const transactionRoutes = require('./routes/transactionRoutes');
const { PORTAPI} = require('./constants/apiConsts');
const authRoutes = require('./routes/authRoutes');
const HttpError = require('./models/httpError');
const sequelize = require('./config/database');
const bodyParse = require('body-parser');
const express = require('express');
const cors = require('cors');


const app = express();

//Using: body parse
app.use(bodyParse.json());

//Allowing cors from other server
app.use(cors());
app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Header','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE');
    next();
});

//routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

//Middleware to validate any route that does not exist
app.use((req,rest,next) =>{
    const error = new HttpError('Could not find this route',404);
    throw error;
})

//Middleware to handler the errors in the routes
app.use((error, req, res, next)=>{
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknow error has ocurred !.'});
})

sequelize.sync({ force: false })
        .then(() => {
            console.log('Database connected !!');
            app.listen(PORTAPI || 3000, () =>{
                console.log(`Server is running on port ${PORTAPI}`);
            })
        })
        .catch( error => {
            console.log(error);
        });
