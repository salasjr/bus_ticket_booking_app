const express = require("express")
const auth = require("../../middleware/bus")
const servicerouter = express.Router()
const { postservice ,updateservice,getservice,deletservice,getservicebyid,getbookservice} = require("../../controllers/service/service")


servicerouter.post("/",auth,postservice)
servicerouter.patch("/:id",auth,updateservice)
servicerouter.get("/",auth,getservice)
servicerouter.delete("/:id",auth,deletservice)
servicerouter.get("/getservice/:id",getservicebyid)
servicerouter.get("/getbookservice/:id",getbookservice)


module.exports = servicerouter;