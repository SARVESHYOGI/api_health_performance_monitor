require('dotenv').config();
const express = require('express');
const pool = require('./db');
require("./apiMonitor.job");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 3000;

const userRoutes = require('./routes/user.routes');
const monitorRouter = require('./routes/monitor.route')

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes)
app.use('/monitor', monitorRouter)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

