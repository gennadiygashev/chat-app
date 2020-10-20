export interface IMessage {
  text: string
  userName: string
  date: any
}

export interface InitialState {
  joined: boolean
  roomID: string
  userName: string
  users: string[]
  messages: any[]
}
