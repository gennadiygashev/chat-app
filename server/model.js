const { Schema, model } = require('mongoose')

const RoomSchema = new Schema({
  roomID: {
    type: String,
    require: true,
  },
  messages: {
    type: Array,
  },
  users: {
    type: Array,
  },
})

module.exports = model('Rooms', RoomSchema)
