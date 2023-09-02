const express = require("express")
const service = require("../../models/busowner/service")

const postservice = async (req,res)=>{
    const {ending, starting,price,killometer} = req.body;
    try{
        const newservice =  new service({
           ending,starting,price,killometer,
           owner: req.user._id
        })
        await newservice.save();
        res.status(201).json({newservice, message: "service added Successfully"});
    }
    catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}

const updateservice = async (req,res)=>{
    const serviceid = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['starting', 'ending','price','killometer'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if(!isValidOperation){
        return res.status(400).json({error: "Invalid Updates"});
    }

    try{
      const updateservice = await service.findOne({
            _id: serviceid,
            owner: req.user._id
      });

        if(!updateservice){
            return res.status(404).json({message: "update not found"});
        }

        updates.forEach(update => updateservice[update] = req.body[update]);
        await updateservice.save();

        res.json({
            message: "serivce Updated Successfully",
        })
    }
    catch(err){
        res.status(500).send({error: err});
    }
}

const getservice = async(req,res)=>{
    try{
        const getservice = await service.find({
            owner: req.user._id
        });
        if(!getservice){
            return res.status(404).json({message: "service not found"});
        }
        res.status(200).json({getservice, message: "service Fetched Successfully"});
    }
    catch(err){
        res.status(500).send({error: err});
    }
}

const getbookservice = async(req,res)=>{
    const bookedid = req.params.id

    try{
        const getservice = await service.find({
            _id: bookedid,
        });
        if(!getservice){
            return res.status(404).json({message: "booked service not found"});
        }
        res.status(200).json({getservice, message: "booked Fetched Successfully"});
    }
    catch(err){
        res.status(500).send({error: err});
    }

}
const getservicebyid = async(req,res)=>{
    const serviceid = req.params.id;
    try{
        const findservice = await service.find({owner:serviceid});
        if(!findservice){
            return res.status(404).json({message: "service not found"});
        }
        res.status(200).json({findservice, message: "service Fetched Successfully"});
    }catch(err){
        res.status(500).send({error: err});
    }
}
const deletservice = async(req,res)=>{
    const serviceid = req.params.id
    try{
        const deletedservice = await service.findOneAndDelete({
            _id: serviceid,
            owner: req.user._id
        });
        if(!deletedservice){
            return res.status(404).json({message: "service not found"});
        }
        res.status(200).json({deletedservice, message: "book Deleted Successfully"});
    }
    catch(err){
        res.status(500).send({error: err});
    }
}
module.exports = {postservice,updateservice,getservice,deletservice,getservicebyid,getbookservice}