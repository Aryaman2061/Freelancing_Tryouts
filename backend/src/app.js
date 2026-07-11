const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors({
    origin: "http://127.0.0.1:5500",
    credentials: true
}));
app.use(express.json());

const authRouter = require("./routes/authRoutes")
const updateProfileRouter = require("./routes/updateProfileRoutes")
const getProfileRouter = require("./routes/getProfileRouters")

app.use('/api/auth',authRouter);
app.use('/api/profile',updateProfileRouter);
app.use('/api/profile',getProfileRouter);

const connectDB = require('./config/database');
connectDB();

module.exports = app;
