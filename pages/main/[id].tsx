import Head from 'next/head'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import socket from '../../utils/socket'
import ChatCard from '../../components/ChatCard'
import Message from '../../components/Message'
import { setUsers, setMessage } from '../../store/actions'
import classes from '../../styles/main.module.scss'
import { Button, TextField } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import { InitialState, IMessage } from '../../store/types'

interface MainProps {
  messages: any[]
  users: string[]
  nickname: string
  roomID: string

  setUsers: (users: string[]) => void
  setMessage: (message: IMessage) => void
}

const Main: React.FC<MainProps> = ({ messages, users, nickname, roomID, setUsers, setMessage }) => {
  const [messageValue, setMessageValue] = useState('')

  useEffect(() => {
    socket.on('socket:set_users', (users: string[]) => setUsers(users))
    socket.on('socket:new_message', (message: IMessage) => setMessage(message))
  }, [])

  const onSendMessage = () => {
    socket.emit('socket:new_message', {
      nickname,
      roomID,
      text: messageValue
    })
    setMessage({ nickname, text: messageValue })
    setMessageValue('')
  }

  return (
    <>
      <Head>
        <title>Chat-App | Комната {roomID}</title>
      </Head>
      <div className={classes.root}>
        <section className={classes.chats}>
          <h3>Комната {roomID}</h3>
          <h3>Oнлайн: ({users.length})</h3>
          {
            users.map((name, index) => (
              <ChatCard 
                name={name} 
                key={name + index} 
              />
            ))
          }
        </section>
        <section className={classes.mainChat}>
          <div className={classes.chatArea}>
            {
              messages.map((message, index) => (
                <Message 
                  text={message.text} 
                  author={nickname === message.nickname ? 'you' : 'interlocutor'} 
                  key={message + index} 
                />
              ))
            }
          </div>
          <div className={classes.sendForm}>
            <TextField 
              variant="outlined" 
              className={classes.sendInput}
              onChange={e => setMessageValue(e.target.value)}
              value={messageValue}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.sendButton}
              endIcon={<SendIcon />}
              onClick={onSendMessage}
            >
            Отправить
          </Button>
          </div>
        </section>
      </div>
    </>
  )
}

const mapState = (state: InitialState) => ({
  messages: state.messages,
  users: state.users,
  nickname: state.nickname,
  roomID: state.roomID
})

const mapDispatch = (dispatch) => ({
  setUsers: (users: string[]) => dispatch(setUsers(users)),
  setMessage: (message: IMessage) => dispatch(setMessage(message))
})

export default connect(mapState, mapDispatch)(Main)


