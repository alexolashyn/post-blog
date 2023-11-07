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


app.set('trust proxy', 1);
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit')
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
}));

const authRouter = require('./routes/auth');
const blogRouter = require('./routes/blog')

app.use('/api/auth', authRouter);
app.use('/api/blog', blogRouter);

app.get('/', (req, res) => {
    res.redirect('/api/auth/login');
});

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