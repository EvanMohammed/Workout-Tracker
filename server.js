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
// const router = express.Router();
// app.use("/", router);
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
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
// router.route("/api/workout").post(function (req,res) {
//   db.Workout.insertMany(
//     [{name},
//     {exercises}],
//     function (err,result) {
//       if (err) {
//         console.log(err);
//         res.json(err)
//       } else {
//         res.send(result)
//       }
//     }
//   )
// })
app.post("/api/workout", (req, res) => {
  db.Workout.create({}).then((data) => res.json(data))
});

app.put("/api/workout/:id", ({body, params}, res) => {
  console.log(body)
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body}  },
    { new: true, runValidators: true }
  )
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
    console.log(req.body)
});
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/exercise.html"));
});
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/stats.html"));
});
app.get("/api/workout", (req, res) => {
  Workout.find().then((data) => {
    res.json(data)
  }).catch(err =>{
    console.log(err)
  })
});
app.get("/stats", (req, res) => {
  Workout.find().then((data) => {
    res.json(data)
  }).catch(err =>{
    console.log(err)
  })
});
app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
});