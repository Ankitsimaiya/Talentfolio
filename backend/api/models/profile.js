// models/Profile.js
import mongoose, { Schema } from "mongoose";

const profileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      maxlength: 500,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    availability: {
      type: String,
      enum: ["Available", "Busy", "Not Available"],
      default: "Available",
    },
    media: {
      mediaId: [{ type: Schema.Types.ObjectId, ref: "Media" }],
    },
    social: {
      facebook: { type: String, trim: true, default: "" },
      twitter: { type: String, trim: true, default: "" },
      instagram: { type: String, trim: true, default: "" },
      linkedin: { type: String, trim: true, default: "" },
    },
    location: {
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "" },
      zipCode: { type: String, default: "" },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
export default Profile;
