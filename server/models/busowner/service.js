const mongoose = require("mongoose")
const serviceSchema = new mongoose.Schema({
    starting: {type: String,required: true,},
    ending: { type: String, required: true,},
    price:{type: String},
    killometer:{type: String},
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'BusOwner',
    }

},{
    timestamps: true
});

const Service = mongoose.model("serviceSchema", serviceSchema)
module.exports = Service;