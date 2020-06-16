const db_config = require('../config/db_config');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || db_config.dbURL, db_config.dbOptions)
    .then(() => console.log('mongodb connected'))
    .catch((error) => console.log(error));
mongoose.Promise = global.Promise;