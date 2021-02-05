import { Schema, model, Document } from 'mongoose'
import { User } from '../../types/User'

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    require: true
  },
  requests: [String],
  friends: [
    {
      username: String,
      chatID: String
    }
  ]
})

export default model<User & Document>('Users', UserSchema)
