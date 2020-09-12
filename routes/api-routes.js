const Workout = require('../models/Workout.js')

module.exports = function (app) {
  app.get("/api/workout", (req, res) => {
    Workout.find()
      .then((dbworkout) => {
        res.json(dbworkout);
      })
      .catch((err) => {
        res.json.err;
      });
  });

  app.post("/api/workout", (req, res) => {
   Workout.create({}).then((data) => res.json(data))
  });

  app.put("/api/workout/:id", ({ body, params }, res) => {
    console.log(body)
    Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      { new: true, runValidators: true }
    )
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
   
  });

  app.get("/api/workout", (req, res) => {
    Workout.find().then((data) => {
      res.json(data)
    }).catch(err => {
      console.log(err)
    })
  });

  app.get("/api/workout/range", (req, res) => {
    Workout.find().then((data) => {
      res.json(data)
    }).catch(err => {
      console.log(err)
    })
  });





}