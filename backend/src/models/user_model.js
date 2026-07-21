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
        default: null,
        required: function () {
            return this.authProvider === "local";
        },
        validate: {
            validator: function (value) {

                // Skip validation for Google users
                if (this.authProvider === "google") {
                    return true;
                }

                // Local users must have a password
                if (!value) {
                    throw new Error("Password is required.");
                }

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
                    throw new Error("Password must contain at least one special character.");
                }

                return true;
            }
        }
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

    profileCompleted: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        enum: ["client", "freelancer", "admin"],
        default: null,
    },

    //Profile

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

    skills: {
        type: [String],
        default: []
    },

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

    // Client
    companyName: {
        type: String,
        default: ""
    },

    companyWebsite: {
        type: String,
        default: ""
    },


    resume: {
        url: {
            type: String,
            default: ""
        },
        public_id: {
            type: String,
            default: ""
        }
    },

    portfolio: [
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                default: ""
            },
            image: {
                type: String,
                default: ""
            },
            document: {
                url: {
                    type: String,
                    default: ""
                },
                public_id: {
                    type: String,
                    default: ""
                }
            },
            projectUrl: {
                type: String,
                default: ""
            }
        }
    ],


    profilePicture: {
        type: String,
        default: ""
    },
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
