const mongoose = require("mongoose")
const bcrypt = require('bcrypt');


const Busownerschema = new mongoose.Schema({
    name: {type: String,required: true,},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phonenumber: {type: String,required:true},
    photo:{type:String },
},{
    timestamps:true
});
Busownerschema.pre('save' , async function(next) {
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const BusOwner = mongoose.model("Busownerschema", Busownerschema)
module.exports = BusOwner;