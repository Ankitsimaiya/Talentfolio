const mongoose = require("mongoose");
const {Schema} = require('mongoose')

const mediaSchema = mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    enum: ["image", "video"],
    required: true,
  },

  categories: {
    type: String,
    required: true,
  },
  hide: {
    type: Boolean,
    default: false,
  },

  like: {
    type: Number,
    default: 0,
  },
  view: {
    type: Number,
    default: 0,
  },

},{timestamps:true});

const Media = mongoose.model("Media", mediaSchema);

module.exports = Media;
