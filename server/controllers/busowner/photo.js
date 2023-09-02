const express = require('express')
const photorouter = express.Router()
require("dotenv").config()
const cloudinary = require("cloudinary").v2;
const multer = require("multer")
const busOwner = require("../../models/busowner/busowner")
const auth = require('../../middleware/bus')

require("dotenv").config()

cloudinary.config({
    cloud_name : process.env.CL_NAME,
    api_key : process.env.CL_API_KEY,
    api_secret : process.env.CL_API_SECRET,
})


const storage = multer.memoryStorage()
const upload = multer({storage: storage})


photorouter.post("/upload",auth ,upload.single('myimage'), async (req,res)=>{
    const file = req.file
    console.log(req.user_id)
    if(!file){
        return res.status(400).json({error:"image not found"})
    }
    const existinguser = await busOwner.findById(req.user._id)
    if(!existinguser){
        return res.status(400).json({error:"user not found"})
    }
    cloudinary.uploader.upload_stream({resource_type: "auto"},
    async(error,result)=>{
        if(error){
            return res.status(500).json({error: "error while uploading"})
        }
        existinguser.photo = result.secure_url
        await existinguser.save()
        res.json({photo: result.url, message: "sucess"})
    }).end(file.buffer);
})




module.exports = photorouter;