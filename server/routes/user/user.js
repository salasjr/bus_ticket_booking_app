const express = require("express")
const userRouter = express.Router();
const auth = require("../../middleware/user")

const {register,login,
    getuser,updateuser,deleteuser
} = require("../../controllers/user/user")


userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/",auth,getuser)
userRouter.patch("/:id",auth,updateuser)
userRouter.delete("/:id",auth,deleteuser)

module.exports = userRouter;