const express = require('express');
const userRouter = require('./routes/user.routes');
const timerRouter = require('./routes/timer.routes');
const PORT = process.env.PORT || 8088;

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use('/user', userRouter);
app.use('/timer', timerRouter);

app.listen(PORT, () => console.log(`Server running on ${PORT}...`));