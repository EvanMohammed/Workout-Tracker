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
console.log(process.env.MONGODB_URI);
mongoose.connect('mongodb+srv://fitness:Evan123456@cluster0.z2aew.mongodb.net/Workout?retryWrites=true&w=majority', {

  useNewUrlParser: true,
  useFindAndModify: false,
});

// Requiring the Routes
require("./routes/api-routes")(app);

require("./routes/html-routes")(app);


app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
});