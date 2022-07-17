const Exercise = require("../models/exerciseModel");
const mongoose = require("mongoose");

// GET all exercises
const getExercises = async (req,res)=>{
    const exercises = await Exercise.find({}).sort({createdAt: -1});

    if(!exercises || exercises.length==0){
        return res.status(404).json({error: "No Exercises!"})
    }
    res.status(200).json(exercises);
};

// GET single Exercise
const getExercise = async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No Such Exercise!"})
    }

    const exercise = await Exercise.findById(id);

    if(!exercise){
        return res.status(404).json({error: "No Such Exercise!"})
    }
    res.status(200).json(exercise);
};

// POST new Exercise --NEED TO FIX
const createExercise = async (req,res)=>{
    const exerciseBody = req.body;
    //add doc to DB
    try {
        const exercise = await Exercise.create(exerciseBody);
        res.status(200).json(exercise);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};
// DELETE single exercise
const deleteExercise = async (req,res)=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No Such Exercise!"})
    }

    const exercise = await Exercise.findByIdAndDelete(id);

    if(!exercise){
        return res.status(400).json({error: "No Such Exercise!"})
    }

    res.status(200).json(exercise);
}

//UPDATE single exercise
const updateExercise = async (req,res)=>{
    const id = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No Such Exercise!"})
    }

    console.log(id,req.body);

    const exercise = await Exercise.findOneAndUpdate(id, {
      ...req.body  
    });

    if(!exercise){
        return res.status(400).json({error: "No Such Exercise!"})
    }

    res.status(200).json(exercise);
}

module.exports = {
    createExercise,
    getExercises,
    getExercise,
    deleteExercise,
    updateExercise
}