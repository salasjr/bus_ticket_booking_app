const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userrouter =  require('./routes/userroute') 
const taskrouter = require("./routes/taskroute")

require("dotenv").config()
require('./db')
const PORT = 8000

app.use(bodyParser.json());
app.use("/users", userrouter)
app.use("/task", taskrouter)


app.get('/', (req, res) => {
    res.json({
        message: 'Task Manager API is working!'
    })
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});