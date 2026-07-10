const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },

    lastName: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already exists"],
        lowercase: true,
        trim: true,
    },

    password: {
        type: String,
        required: [true, "password is required"],
        validate: {
        validator: function (value) {
            if (value.length < 8) {
            throw new Error("Password must be at least 8 characters long.");
            }

            if (!/[A-Za-z]/.test(value)) {
            throw new Error("Password must contain at least one letter.");
            }

            if (!/\d/.test(value)) {
            throw new Error("Password must contain at least one number.");
            }

            if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            throw new Error(
                "Password must contain at least one special character.",
            );
            }

            return true;
        },
        },
        default: null
    },

    authProvider: {
            type: String,
            enum: ["local", "google"],
            default: "local"
    },

    googleId: {
        type: String,
        default: null
    },

    
    verified: {
        type: Boolean,
        default: false,
    },
    
    role: {
        type: String,
        enum: ["client", "freelancer", "admin"],
        default: "freelancer",
    },
    
    //Profile
    profilePicture: {
        type: String,
        default: ""
    },

    coverPicture: {
        type: String,
        default: ""
    },

    bio: {
        type: String,
        default: ""
    },

    location: {
        type: String,
        default: ""
    },

    website: {
        type: String,
        default: ""
    },

    phone: {
        type: String,
        default: ""
    },

    // Professional
    title: {
        type: String,
        default: ""
    },

    skills: [{
        type: String
    }],

    experienceLevel: {
        type: String,
        enum: ["beginner", "intermediate", "expert"],
        default: "beginner"
    },

    hourlyRate: {
        type: Number,
        default: 0
    },

    languages: [{
        type: String
    }],

    // Portfolio
    resume: {
        type: String,
        default: ""
    },

    portfolio: [{
        title: String,
        description: String,
        image: String,
        projectUrl: String
    }],

    // Statistics
    rating: {
        type: Number,
        default: 0
    },

    totalReviews: {
        type: Number,
        default: 0
    },

    completedProjects: {
        type: Number,
        default: 0
    },

    totalEarnings: {
        type: Number,
        default: 0
    },

    // Account Status
    isBlocked: {
        type: Boolean,
        default: false
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    isOnline: {
        type: Boolean,
        default: false
    },

    lastSeen: {
        type: Date
    },

    // Security
    refreshToken: {
        type: String,
        default: null
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);
