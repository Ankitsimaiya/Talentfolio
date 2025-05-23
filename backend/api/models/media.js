import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const mediaSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  url: {
    type: String,
    required: true,
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    required: true,
    lowercase: true,
    trim: true,
  },
  categories: {
    type: [String], // allows multiple categories
    required: true,
  },
  hide: {
    type: Boolean,
    default: false,
  },
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  view: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

// Add indexes if needed
mediaSchema.index({ userId: 1 });
mediaSchema.index({ categories: 1 });
mediaSchema.index({ mediaType: 1 });

const Media = model('Media', mediaSchema);

export default Media;
