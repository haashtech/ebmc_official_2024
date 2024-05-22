import mongoose from 'mongoose'


const Schema = mongoose.Schema;

const sessionSchema = new Schema({

    sessionId:{
        type:String,        
    },
    updatedData:{
        type:Schema.Types.Mixed
    },

    timestamp:{
        type:Date,
        default:Date.now()
    }
})

export default mongoose.model("sessionModel",sessionSchema)