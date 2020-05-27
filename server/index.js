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
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
app.use(morgan('combined'));
app.use(passport.initialize());

require('./config/passport');

const api = require('./api');

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;

if (process.env.NODE_ENV === 'production') {
    app.use(epxress.static('client/dist'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
    })
}

http.listen(port, function () {
    console.log(`Server listening on port ${port}`);
});

app.use('/api', api);