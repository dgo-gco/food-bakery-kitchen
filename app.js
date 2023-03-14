require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const app = express();
const userRouter = require('./routes/users')
const errorRouter = require('./routes/errors')
const courseRouter = require('./routes/courses')
const subscriberRouter = require('./routes/subscribers')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('homepage')
})

app.use('/api/users', userRouter)
app.use('/api/courses', courseRouter)
app.use('/api/subscribers', subscriberRouter)
app.use('/api/*', errorRouter)


module.exports = app;