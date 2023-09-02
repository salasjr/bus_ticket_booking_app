const express = require("express")
const busOwner = require("../../models/busowner/busowner")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (req,res)=>{
    try {
        const { name, email, password,phonenumber} = req.body;
    
            const user = new busOwner({ name, email, password,phonenumber});
            await user.save();
            res.status(201).send({ user, message: "busowner Created Successfully" });
        }
    
        catch (err) {
            return res.status(400).send({ error: err });
        }
    
}

const login = async(req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await busOwner.findOne({ email });
       
        if(!user){
           return res.status(404).json({
               message: "busowner not found"
            })
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if(!isMatch){
           return res.status(403).json({
               message: "forbidden"
            })
        }
    
        const token = jwt.sign({
            _id: user._id.toString()
        }, process.env.JWT_SECRET_KEY );
    
        res.send({ user, token , message: "Logged in successfully"});
       }
        catch (err) {
            res.status(400).send({ error: err });
        }
};

const getalluser = async(req,res)=>{
    try{
        const alluser = await busOwner.find();
        res.status(200).json({
            alluser,
            message: "sucess"
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}
const getuser = async(req,res)=>{
    try{
        const getuser = await busOwner.findById(req.user._id);
        if(!getuser){
            return res.status(404).json({message: "busowner not found"});
        }
        res.status(200).json({getuser, message: "busowner Fetched Successfully"});
    }
    catch(err){
        res.status(500).send({error: err});
    }
}

const getbususer = async(req,res)=>{
    try{
        const getuser = await busOwner.find({
            id:req.user_id
        });
   
        if(!getuser){
            return res.status(404).json({message: "busowner not found"});
        }
        res.status(200).json({getuser, message: "busowner Fetched Successfully"});
    }
    catch(err){
        res.status(500).send({error: err});
    }
}


const updateuser = async(req,res)=>{
    const userid = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'phonenumber','email'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if(!(userid==req.user._id )){
        return res.status(404).json({
            message:"forbidden"
        })
    }

    if(!isValidOperation){
        return res.status(400).json({error: "Invalid Updates"});
    }

    try{
      const updateuser = await busOwner.findById(userid);

        if(!updateuser){
            return res.status(404).json({message: "updatebusowner not found"});
        }

        updates.forEach(update => updateuser[update] = req.body[update]);
        await updateuser.save();

        res.json({
            updateuser,
            message: "Updated Successfully",
        })
    }
    catch(err){
        res.status(500).send({error: err});
    }
}

const deleteuser = async(req,res)=>{
    const userid = req.params.id
    try{
        if(!(userid==req.user._id )){
            return res.status(404).json({
                message:"forbidden"
            })
        }
        const deleteduser = await busOwner.findOneAndDelete({ _id: userid});
        if(!deleteduser){
            res.status(404).json({message: "busowner not found"});
        }
        res.status(200).json({deleteduser, message: "Deleted Successfully"});
    }
    catch(err){
        res.status(500).send({error: err});
    }
}

module.exports = {register,login,getuser,updateuser,deleteuser,getalluser,getbususer}