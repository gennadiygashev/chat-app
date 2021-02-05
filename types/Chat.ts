import * as mongoose from 'mongoose'

export interface Message {
  text: string
  date: string
  username: string
}

export interface Chat extends mongoose.Document {
  users: string[]
  messages: Message[]
}
