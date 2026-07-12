const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));
app.use(express.json());

const authRouter = require("./routes/authRoutes")
const profileRouter = require("./routes/profileRoutes")
const createJobRouter = require("./routes/createJobRoutes")

app.use('/api/auth',authRouter);
app.use('/api/profile',profileRouter);
app.use('/api/job',createJobRouter);

const connectDB = require('./config/database');
connectDB();

module.exports = app;
