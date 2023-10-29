const express = require('express');
const mongoose = require('mongoose');
const db = require('./DBConfig/mongoose');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const methodOverride = require('method-override');

const app = express();
const port = process.env.PORT || 5000;

// connection to mongodb server
db.DBConnect() 

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL
    }),
    cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
}))


// routes
app.use(require('./routes/index'));
app.use(require('./routes/todo'));

// server configurations...

app.listen(port, () => console.log(`Server is listening on port ${port}`));
