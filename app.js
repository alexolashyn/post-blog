const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));
app.set("view engine", "ejs");


const authRouter = require('./routes/auth');
const blogRouter = require('./routes/blog')

app.use('/api/auth', authRouter);
app.use('/api/blog', blogRouter);

app.get('', (req, res) => {
    res.redirect('/api/auth/login');

})

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