const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    day: {
        type: Date,
        default: () => new Date(),
      },
    exercises: [
        {
            type:{type:String},
            name: String,
            duration: Number,
            weight: Number,
            reps: Number,
            sets: Number,
            distance: Number
        }],
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)
workoutSchema.virtual("totalDuration").get(function () {
    return this.exercises.reduce((acc,exercise) =>{
       return acc + exercise.duration;
    }, 0)
})
const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;