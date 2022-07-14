const express = require("express");
const {
    createExercise,
    getExercises,
    getExercise,
    deleteExercise,
    updateExercise
} = require("../controllers/exerciseController");

const router = express.Router();

//GET all workouts
router.get("/",getExercises);

//GET single workout
router.get("/:id",getExercise);

//POST new workout
router.post("/", createExercise);

//DELETE single workout
router.delete("/:id",deleteExercise);

//UPDATE single workout
router.patch("/:id",updateExercise);

module.exports = router;