const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
  userName: {
    type: String,
    require: true,
  },
  requests: Array,
  chats: [
    {
      chatID: String,
      userName: String,
    },
  ],
})

module.exports = model('Users', UserSchema)
