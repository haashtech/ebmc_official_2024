import mongoose from "mongoose";

const Schema = mongoose.Schema;

const newsSchema = new Schema({
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model("newsModel", newsSchema);
