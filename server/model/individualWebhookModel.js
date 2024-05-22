import mongoose from "mongoose";

const Schema = mongoose.Schema;

const individualWebhookPayloadSchema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true,
  },

  payload: {
    type: Schema.Types.Mixed,
    
  },
});


export default mongoose.model("individualWebhookPayload",individualWebhookPayloadSchema);