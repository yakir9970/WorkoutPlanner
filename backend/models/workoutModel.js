const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    exercises:[{
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
    }]
},{timestamps: true});

// const workoutSchema = new mongoose.Schema({
//     workout: [[exerciseSchema]]
// });

module.exports = mongoose.model("Workout",workoutSchema);