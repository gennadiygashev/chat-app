export interface IMessage {
  text: string
  nickname: string
  date: any
}

export interface InitialState {
  joined: boolean,
  roomID: string,
  nickname: string,
  users: string[],
  messages: any[]
}

