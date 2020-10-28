import { InitialState } from './types'

const initialState: InitialState = {
  joined: false,
  userName: null,
  chats: [],
  messages: [],
  requests: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'JOINED':
      return {
        ...state,
        joined: true,
        userName: action.payload,
      }
    case 'SET_DATA':
      return {
        ...state,
        chats: action.payload.chats,
        requests: action.payload.requests,
      }
    case 'SET_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: action.payload,
      }
    case 'SET_REQUEST':
      return {
        ...state,
        requests: [...state.requests, action.payload],
      }
    case 'DELETE_REQUEST': 
      return {
        ...state,
        requests: [...state.requests.filter(request => request !== action.payload)]
      }
    case 'SET_CHAT':
      return {
        ...state,
        chats: [...state.chats, action.payload],
      }
    default:
      return state
  }
}

export default reducer
