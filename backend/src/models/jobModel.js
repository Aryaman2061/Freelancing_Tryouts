const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        trim: true
    },
    
    organization: {
        type: String,
        trim: true
    },

    skillRequired: {
        type: [String],
        default: []
    },

    stipend: {
        type: Number,
        required: true
    },
    
    location: {
        type: String,
        trim: true
    },

    mode: {
        type: String,
        enum: ["online", "offline"],
        default: "offline"
    },

    expiresAt: {
        type: mongoose.Schema.Types.Date,
    }


})

module.exports = mongoose.model("Job", jobSchema);