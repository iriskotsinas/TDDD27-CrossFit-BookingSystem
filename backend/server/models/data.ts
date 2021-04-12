import mongoose from 'mongoose'


const dataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String, 
    required: true
  }
})

const Data = mongoose.model("User", dataSchema)

export { Data }