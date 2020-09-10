const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3000;
const db = require("./models");
const { Workout } = require("./models");
const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});
app.post("/api/workout", (req, res) => {
  db.Workout.create({}).then((data) => console.log(res.json(data)));
});
app.get("/api/workout", (req, res) => {
  Workout.find()
    .then((dbworkout) => {
      res.json(dbworkout);
    })
    .catch((err) => {
      res.json.err;
    });
});
app.put("/api/workout/:id", ({ body }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true }
  )
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
  
});
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/exercise.html"));
});
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/stats.html"));
});
app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
});