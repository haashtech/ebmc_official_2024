import mongoose from 'mongoose';

const { Schema } = mongoose;

const apiHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  
  sessionId:{
    type:String,        
},
  query: {
    type: Schema.Types.Mixed 
  },
  response: {
    type: Schema.Types.Mixed 
  }
  
}, { timestamps: true });

const ApiHistory = mongoose.model('ApiHistory', apiHistorySchema);

export default ApiHistory;
