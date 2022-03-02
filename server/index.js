const express = require('express');
const userRouter = require('./routes/user.routes');
const timerRouter = require('./routes/timer.routes');
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use('/user', userRouter);
app.use('/timer', timerRouter);

app.listen(PORT, () => console.log(`Server running on ${PORT}...`));