const mongoose = require("mongoose")
const bcrypt = require('bcrypt');


const Userschema = new mongoose.Schema({
    name: {type: String,},
    email: { type: String,},
    password: { type: String,},
    phonenumber: {type: String,},
    photo:{type:String }

},{
    timestamps:true
});
Userschema.pre('save' , async function(next) {
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model("Userschema", Userschema)
module.exports = User;