const express = require('express');
const app = express();
const http = require('http').Server(app);
module.exports = http;
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require('path');
const errorHandler = require('./_helpers/error-handler');
require('./db/db');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: '' }));
app.use(morgan('combined'));
app.use(passport.initialize());
app.use(function (req, res, next) {
    res.setHeader("Content-Type", "application/json")
    next();
});

require('./config/passport');

const api = require('./api');

// global error handler
app.use(errorHandler);

// start server
const port = process.env.PORT || 4000;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../client', 'dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
    })
}

http.listen(port, function () {
    console.log(`Server listening on port ${port}`);
});

app.use('/api', api);
