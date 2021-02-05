import mongoose from 'mongoose'

export interface User extends mongoose.Document {
  username: string
  requests: string[]
  friends: {
    username: string
    chatID: string
  }[]
}
