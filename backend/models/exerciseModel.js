const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
        name: {
                type: String,
                required: true
            },
            primary:{
                type: String,
                required: true
            },
            secondary: [{
                type: String,
                required: true
            }]        
},{timestamps: true});

module.exports = mongoose.model("Exercise",exerciseSchema);