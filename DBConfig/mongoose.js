const mongoose = require('mongoose');
require('dotenv').config();

const DBConnect = () => {
    mongoose.connect(process.env.DB_URL);

    // Event handling for connection success
    mongoose.connection.on("connected", ()=>{
        console.log("connection to database is successful")
    });

    // Event handling for connection error
    mongoose.connection.on("error", (err)=>{
        console.log("connection to database failed", err)
    });

    // Event handling for disconnection
    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
    });

    // Shutdown of the MongoDB connection when the Node.js process is terminated
    process.on('SIGINT', () => {
        db.close(() => {
          console.log('MongoDB connection closed due to app termination');
          process.exit(0);
        })});

}

module.exports = {DBConnect}