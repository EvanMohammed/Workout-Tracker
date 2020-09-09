const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema ({
    name: {
        type: String,
        unique: true
    },
    exercises: [{
        type: Schema.Types.ObjectId,
        ref: "Resistance" , "Cardio"
    }]
});

const Workout = mongoose.model("Workout" , WorkoutSchema);
module.exports = Workout;