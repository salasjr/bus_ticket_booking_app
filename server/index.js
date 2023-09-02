const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors")
const PORT = 8000

const user = require("./routes/user/user")
const book = require("./routes/user/book")
const bus = require("./routes/busowner/busowner")
const image = require("./controllers/user/photo")
const busimage = require("./controllers/busowner/photo")
const service = require("./routes/busowner/service")

require("dotenv").config()
require("./db")

app.use(bodyParser.json());
app.use(cors())
app.use("/user", user)
app.use("/book",book)
app.use("/bus",bus)
app.use("/image", image)
app.use("/busimage",busimage)
app.use("/service",service)

app.get("/", (req,res)=>{
    return res.json({
        message:"api working"
    })
})

app.listen(PORT,()=>{
    console.log(`server listening at port ${PORT}`)
})