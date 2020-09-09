const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CardioSchema = new Schema ({
    name: {
        type: String
    },
    time: {
        String
    }
})

const Cardio = mongoose.model("Cardio" , CardioSchema);
module.exports = Cardio;