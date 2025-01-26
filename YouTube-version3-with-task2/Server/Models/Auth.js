import mongoose from "mongoose";

const userschema = mongoose.Schema({
  email: { type: String, require: true },
  name: { type: String },
  desc: { type: String },
  joinedon: { type: Date, default: Date.now },
  // watchedVideos: [String],
  watchedVideos: { type: Map, of: Boolean, default: {} },
  points: { type: Number, default: 0 },
});

export default mongoose.model("User", userschema);
