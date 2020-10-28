import { IMessage } from './types'

export function joinedToService(userName: string) {
  return {
    type: 'JOINED',
    payload: userName,
  }
}

export function setData(chats: any[], requests: any[]) {
  return {
    type: 'SET_DATA',
    payload: {
      chats,
      requests,
    },
  }
}

export function setMessage(message: IMessage) {
  return {
    type: 'SET_MESSAGE',
    payload: message,
  }
}

export function setMessages(messages: IMessage[]) {
  return {
    type: 'SET_MESSAGES',
    payload: messages,
  }
}

export function setRequest(request: string) {
  return {
    type: 'SET_REQUEST',
    payload: request,
  }
}

export function setChat(chat: any) {
  return {
    type: 'SET_CHAT',
    payload: chat,
  }
}

export function deleteRequest(request: string) {
  return {
    type: 'DELETE_REQUEST',
    payload: request,
  }
}

