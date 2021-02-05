import { User } from '../types/User'
import { Chat, Message } from '../types/Chat'
import { CHAT, LOGIN, ADD_MESSAGE, ADD_FRIEND, DEL_REQUEST } from './constants'

export const loginAction = (userData: User) => ({
  type: LOGIN,
  payload: userData
})

export const chatAction = (chatData: Chat) => ({
  type: CHAT,
  payload: chatData
})

export type MessageAction = {
  type: 'ADD_MESSAGE'
  payload: Message
}

export const updateAction = (res: MessageAction) => ({
  type: res.type,
  payload: res.payload
})

export const addFriend = (user: { username: string; chatID: string }) => ({
  type: ADD_FRIEND,
  payload: user
})

export const delRequest = (user: string) => ({
  type: DEL_REQUEST,
  payload: user
})
