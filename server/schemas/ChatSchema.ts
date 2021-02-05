import { Schema, model, Document } from 'mongoose'
import { Chat } from '../../types/Chat'

const ChatSchema = new Schema({
  messages: [
    {
      text: String,
      date: String,
      username: String
    }
  ],
  users: {
    type: [String],
    required: true
  }
})

export default model<Chat & Document>('Chats', ChatSchema)
