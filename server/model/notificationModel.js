import mongoose from "mongoose";

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  description: {
    type: String,
    required: true,  
  },
});

export default mongoose.model("NotificationModel", notificationSchema);
