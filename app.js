const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const authRouter = require('./router/auth.router');
const userRouter = require('./router/user.router');
const carRouter = require('./router/car.router');

const configs = require('./config/config');
const {cronRunner} = require("./cron");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/cars', carRouter);

app.use((err, req, res, next) => {

    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 500
    });
});

app.listen(configs.PORT, async () => {
    await mongoose.connect(configs.MONGO_URL);
    console.log(`Server listen ${configs.PORT}`);
    cronRunner();
});

