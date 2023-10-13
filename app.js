const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

require('dotenv').config();

app.use(express.static('./public'));

app.set('view engine', 'ejs');

const authRouter = require('./routes/auth'); 
const blogRouter = require('./routes/blog');

app.use('/api/auth', authRouter);
app.use('/api/blog', blogRouter);

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