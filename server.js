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
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

// Requiring the Routes
require("./routes/api-routes")(app);

require("./routes/html-routes")(app);


app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
});