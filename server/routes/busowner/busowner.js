const express = require("express")
const busRouter = express.Router();
const auth = require("../../middleware/bus")

const {login, register,getuser,updateuser,deleteuser,getalluser,getbususer} = require("../../controllers/busowner/bus");



busRouter.post("/register",register)
busRouter.post("/login",login)
busRouter.get("/", auth,getuser)
busRouter.patch("/:id",auth,updateuser)
busRouter.delete("/:id",auth,deleteuser)
busRouter.get("/getalluser",getalluser)
busRouter.get("/getbususer",auth,getbususer)

module.exports = busRouter

