const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ResistanceSchema = new Schema ({
    name: {
        type: String                          
    },
    reps: {
        type: String,

    }
});

const Resistance = mongoose.model("Resistance" , ResistanceSchema);
module.exports = Resistance;