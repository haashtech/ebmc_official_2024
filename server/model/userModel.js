import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    
  },
  emirate: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  zipCode: {
    type: String,
    required: true,
  },

  trn: {
    type: String,
    required: true,
  },

  checkLimit: {
    type: Number,
    required: true,
  },
  apiUsage:{
    type:Number,
    default:0
  },

  password: {
    type: String,
    required: true,
  },
  isBlocked: { 
    type: Boolean,
    default: false,
  },
});
export default mongoose.model("userModel", userSchema);
