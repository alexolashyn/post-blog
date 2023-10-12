const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('dotenv').config();

const authRouter = require('./routes/auth'); 

app.use('/api/auth', authRouter);
//app.use('/api/blog', blog);

const port = process.env.PORT || 5000;

const connectDB = require('./db/connect');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Listening on ${port} port`));
    }
    catch (error) {
        console.log(error);
    }
}

start();