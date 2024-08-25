const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
})

// Customize toJSON method to transform _id to id
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // Convert _id to string and assign to id
    delete returnedObject._id // Remove _id from the returned object
    delete returnedObject.__v // Remove __v from the returned object
  }
})

module.exports = mongoose.model('Blog', blogSchema)