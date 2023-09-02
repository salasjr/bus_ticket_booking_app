const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MOGNO_URL;
const DB_NAME = process.env.DB_NAME;
mongoose.set("strictQuery", false);

mongoose.connect(MONGO_URL, {
    dbName: DB_NAME
}).then(
    () => {
        console.log('Connected to database');
    }
).catch((err) => {
    console.log('Error connecting to database ' + err);
})