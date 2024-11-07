const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      length: 10,
    },
    social: {
      instragram: String,
      facebook: String,
      x: String,
    },
    location: {
      city: {
        type: String,
        // required: true,
      },

      state: {
        type: String,
        // required: true,
      },

      country: {
        type: String,
        // required: true,
      },

      zipCode: {
        type: String,
      },
    },
    bio: {
      type: String,
    },
    profilePic: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
