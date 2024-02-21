

const express = require('express');


const handler = require('./middleware/handler');
const connect = require('./config/connectDB');
const app = express();



require('dotenv').config();
require('colors')



app.use(express.json());
app.use(express.urlencoded({ extended: false }))
connect()


app.use('/api/user/', require('./routes/userRoute'))
app.use(handler)


app.listen(process.env.PORT, ()=>console.log(`Server started on PORT: ${process.env.PORT}`)) 