const exprees = require('express');
const app = exprees();
const authRoute = require('./routes/auth');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


//setup to read an env variable from a file
dotenv.config();

//Conect to the DB
mongoose.connect(process.env.DB_CONNECT,
{useNewUrlParser: true},
()=> console.log('Conected to db!'))

//Middleware
app.use(exprees.json());
//Route middleware
app.use('/api/user', authRoute);
app.listen(3000, ()=> console.log('Server is running'));
