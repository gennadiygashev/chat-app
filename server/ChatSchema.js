const { Schema, model } = require('mongoose')

const ChatSchema = new Schema({
  messages: [
    {
      text: String,
      date: String,
      userName: String
    },
  ],
})

module.exports = model('Chats', ChatSchema)
