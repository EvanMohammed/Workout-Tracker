const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {useNewUrlParser: true});

db.Workout.create({name: "Workout Day"})
.then(dbWorkout => {
    console.log(dbWorkout);
})
.catch(({message}) =>{
    console.log(message);
});

app.post("/api/workouts" , ({body}, res)=> {
    db.Resistance.create(body)
    .then(({_id}) => db.Workout.findOneAndUpdate({}, {$push: {resistance: _id}}, {new:true}))
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    })
});
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