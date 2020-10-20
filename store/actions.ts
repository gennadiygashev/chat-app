import { IMessage } from './types'

export function joinedToRoom(roomID: string, userName: string) {
  return {
    type: 'JOINED',
    payload: {
      roomID,
      userName,
    },
  }
}

export function setUsers(users: string[]) {
  return {
    type: 'SET_USERS',
    payload: users,
  }
}

export function setMessage(message: IMessage) {
  return {
    type: 'SET_MESSAGE',
    payload: message,
  }
}
