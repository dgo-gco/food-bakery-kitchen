require("dotenv").config();
require("./config/database").connect();

const express = require("express");
const app = express();
const passport = require('passport')
const userRouter = require('./routes/users')
const errorRouter = require('./routes/errors')
const courseRouter = require('./routes/courses')
const subscriberRouter = require('./routes/subscribers')
const session = require('express-session');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));

app.use(passport.initialize())
app.use(passport.session())

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