import { createStore } from 'redux'
import reducer, { State } from './reducer'
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper'

const makeStore: MakeStore<State> = (context: Context) => createStore(reducer)

export const wrapper = createWrapper<State>(makeStore, { debug: true })
