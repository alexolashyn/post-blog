const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

require('dotenv').config();

app.use(express.static('./public'));

app.set('view engine', 'ejs');
app.set('views', './views')

const authRouter = require('./routes/auth'); 
const blogRouter = require('./routes/blog');
const test = require('./routes/test');

app.use('/auth', authRouter);
app.use('/blog', blogRouter);
app.use('/v1', test)

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