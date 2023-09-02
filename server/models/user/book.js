const mongoose = require("mongoose")
const uuid = require("uuid")
const bookSchema = new mongoose.Schema({
    username:{type: String},
    busname:{type: String},
    starting:{type: String},
    ending:{type: String},
    price:{type: String},
    distance:{type: String},
    busownr:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Busowner',
        unique: false

    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: false
    },
},{
    timestamps: true
});

const book = mongoose.model("bookSchema", bookSchema)
module.exports = book;