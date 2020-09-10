const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {useNewUrlParser: true});


app.post("/api/workouts" , ({body}, res)=> {
    db.Cardio.create(body)
    .then(({_id}) => db.Workout.findOneAndUpdate({}, {$push: {cardio: _id}}, {new:true}))
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    })
});
app.get("")

app.listen(PORT , () => {
console.log("Listening on PORT " + PORT)
})