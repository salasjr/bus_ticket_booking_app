const express = require("express")
const book = require("../../models/user/book")


const ticketbook = async (req,res)=>{
    const {username, busname,starting,ending ,price,distance,busid} = req.body
    try{
        const newbook =  new book({
           owner: req.user._id,
           busownr:busid,
           username:username,
           busname:busname,
           starting:starting,
           ending:ending,
           price:price,
           distance:distance
        })
        await newbook.save();
        res.status(201).json({newbook, message: "booked Successfully"});
    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}


const deletticket = async(req,res)=>{
    const bookid = req.params.id
    try{
        const deletedbook = await book.findOneAndDelete({
            _id: bookid,
            owner: req.user._id
        });
      
        if(!deletedbook){
            res.status(404).json({message: "book not found"});
        }
        res.status(200).json({deletedbook, message: "book Deleted Successfully"});
    }
    catch(err){
        res.status(500).send({error: err});
    }
}
const updateticket = async (req,res)=>{
    const bookid = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['starting', 'ending'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).json({error: "Invalid Updates"});
    }

    try{
      const updatebook = await book.findOne({
            _id: bookid,
            owner: req.user._id
      });

        if(!updatebook){
            return res.status(404).json({message: "updatebook not found"});
        }

        updates.forEach(update => updatebook[update] = req.body[update]);
        await updatebook.save();

        res.json({
            message: "book Updated Successfully",
        })
    }
    catch(err){
        res.status(500).send({error: err});
    }
}
const getticket = async(req,res)=>{  
    try{
        const getbook = await book.find({
            busownr: req.user._id
        });
        if(!getbook){
            return res.status(404).json({message: "book not found"});
        }
        res.status(200).json({ getbook, message: "Books Fetched Successfully" });
    }
    catch(err){
        res.status(500).send({error: err});
    }
}


const getticketbyuser = async(req,res)=>{  
    try{
        const getbook = await book.find({
            owner: req.user._id
        });
        if(!getbook){
            return res.status(404).json({message: "book not found"});
        }
        res.status(200).json({ getbook, message: "Books Fetched Successfully" });
    }
    catch(err){
        res.status(500).send({error: err});
    }
}




const test = (req,res)=>{
    res.json({
        message:"working"
    })
}

module.exports = {ticketbook, test,deletticket,updateticket,getticket,getticketbyuser};