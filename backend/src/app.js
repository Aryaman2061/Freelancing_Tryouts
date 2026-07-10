const express = require('express');
const app = express();
app.use(express.json());

const authRouter = require("./routes/authRoutes")
app.use('/api/auth',authRouter);

const connectDB = require('./config/database');
connectDB();

module.exports = app;
