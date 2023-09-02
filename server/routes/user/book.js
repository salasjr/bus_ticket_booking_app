const express = require("express")
const bookRouter = express.Router();
const {ticketbook,test,deletticket,updateticket,getticket,getticketbyuser} = require("../../controllers/book/book");
const auth = require("../../middleware/user");
const auth1 = require("../../middleware/bus")

bookRouter.get("/test", test)
bookRouter.post("/:id",auth ,ticketbook)
bookRouter.delete("/:id",auth,deletticket)
bookRouter.patch("/:id",auth,updateticket)
bookRouter.get("/",auth1,getticket)
bookRouter.get("/user",auth,getticketbyuser)


module.exports = bookRouter;