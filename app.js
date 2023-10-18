const express = require('express');
const mongoose = require('mongoose');
const db = require('./DBConfig/mongoose');

const app = express();
const port = process.env.PORT || 5000;

// connection to mongodb server
db.DBConnect() 

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// routes
app.use(require('./routes/index'))

// server configurations...

app.listen(port, () => console.log(`Server is listening on port ${port}`));
