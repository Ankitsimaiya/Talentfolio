const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      minlength: 10,
      maxlength: 10,
    },
    social: {
      instragram: String,
      facebook: String,
      x: String,
    },
    location: {
      city: {
        type: String,
      },

      state: {
        type: String,
      },

      country: {
        type: String,
      },

      zipCode: {
        type: String,
      },
    },
    bio: {
      type: String,
    },
    profileUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
