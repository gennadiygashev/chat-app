import { User } from '../types/User'
import { HYDRATE } from 'next-redux-wrapper'
import { AnyAction } from 'redux'
import { Chat } from '../types/Chat'
import { ADD_FRIEND, ADD_MESSAGE, CHAT, DEL_REQUEST, LOGIN } from './constants'

export type State = {
  user: User | null
  chat: Chat | null
}

const initialState: State = {
  user: null,
  chat: null
}

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload }
    case LOGIN:
      return {
        ...state,
        user: action.payload
      }
    case CHAT:
      return {
        ...state,
        chat: action.payload
      }
    case ADD_MESSAGE:
      return {
        ...state,
        chat: {
          ...state.chat,
          messages: [...state.chat.messages, action.payload]
        }
      }
    case ADD_FRIEND:
      return {
        ...state,
        user: {
          ...state.user,
          requests: state.user.requests.filter(
            i => i !== action.payload.username
          ),
          friends: [...state.user.friends, action.payload]
        }
      }
    case DEL_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          requests: state.user.requests.filter(i => i !== action.payload)
        }
      }
  }
}

export default reducer
