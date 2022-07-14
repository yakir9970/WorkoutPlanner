const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// GET all workouts
const getWorkouts = async (req,res)=>{
    const workouts = await Workout.find({}).sort({createdAt: -1});

    if(!workouts || workouts.length==0){
        return res.status(404).json({error: "No Workouts!"})
    }
    res.status(200).json(workouts);
};

// GET single workout
const getWorkout = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No Such Workout!"})
    }

    const workout = await Workout.findById(id);

    if(!workout){
        return res.status(404).json({error: "No Such Workout!"})
    }
    res.status(200).json(workout);
};

// POST new workout
const createWorkout = async (req,res)=>{
    const exercises = req.body;
    
    //add doc to DB
    try {
        const workout = await Workout.create({exercises});
        res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};
// DELETE single workout
const deleteWorkout = async (req,res)=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No Such Workout!"})
    }

    const workout = await Workout.findByIdAndDelete(id);

    if(!workout){
        return res.status(400).json({error: "No Such Workout!"})
    }

    res.status(200).json(workout);
}

//UPDATE single workout
const updateWorkout = async (req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No Such Workout!"})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
      ...req.body  
    });

    if(!workout){
        return res.status(400).json({error: "No Such Workout!"})
    }

    res.status(200).json(workout);
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}