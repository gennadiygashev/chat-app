import { InitialState } from "./types"

const initialState: InitialState = {
  joined: false,
  roomID: null,
  nickname: null,
  users: [],
  messages: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'JOINED':
      return {
        ...state,
        joined: true,
        nickname: action.payload.nickname,
        roomID: action.payload.roomID,
      }
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload
      }
    case 'SET_MESSAGE':
      return {
        ...state,
        messages: [
          ...state.messages,
          action.payload
        ]
      }
    default:
      return state
  }
}

export default reducer