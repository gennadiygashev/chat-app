import { IMessage } from "./types"

export function joinedToRoom(roomID: string, nickname: string) {
  return {
    type: 'JOINED',
    payload: {
      roomID,
      nickname
    }
  }
}

export function setUsers(users: string[]) {
  return {
    type: 'SET_USERS',
    payload: users
  }
}

export function setMessage(message: IMessage) {
  return {
    type: 'SET_MESSAGE',
    payload: message
  }
}

