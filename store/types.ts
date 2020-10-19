export interface IMessage {
  text: string
  nickname: string
}

export interface InitialState {
  joined: boolean,
  roomID: string,
  nickname: string,
  users: string[],
  messages: any[]
}

