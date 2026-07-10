const express = require('express');
const app = express();
app.use(express.json());

const authRouter = require("./routes/authRoutes")
const updateProfileRouter = require("./routes/updateProfileRoutes")

app.use('/api/auth',authRouter);
app.use('/api/profile',updateProfileRouter);

const connectDB = require('./config/database');
connectDB();

module.exports = app;
