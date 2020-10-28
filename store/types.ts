export interface IMessage {
  text: string
  userName: string
  date: any
}

export interface InitialState {
  joined: boolean
  userName: string
  chats: any[]
  messages: any[]
  requests: any[]
}
