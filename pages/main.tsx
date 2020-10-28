import Head from 'next/head'
import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import socket from '../utils/socket'
import ChatCard from '../components/ChatCard'
import AddChatCard from '../components/AddChatCard'
import Message from '../components/Message'
import {
  setMessage,
  setRequest,
  setChat,
  deleteRequest,
  setMessages,
} from '../store/actions'
import classes from '../styles/main.module.scss'
import { InitialState, IMessage } from '../store/types'
import AddChatInput from '../components/AddChatInput'
import ChatIcon from '../svg/ChatIcon'
import EmptyChatIcon from '../svg/EmptyChatIcon'
import SearchIcon from '../svg/SearchIcon'
import SadIcon from '../svg/SadIcon'
import SendMessageInput from '../components/SendMessageForm'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert/Alert'

type Color = 'success' | 'info' | 'warning' | 'error'

interface MainProps {
  messages: any[]
  chats: any[]
  requests: any[]
  userName: string
  roomID: string

  setChats: (chats: string[]) => void
  setMessage: (message: IMessage) => void
  setMessages: (messages: IMessage[]) => void
  setRequest: (request: string) => void
  setChat: (chat: any) => void
  deleteRequest: (request: string) => void
}

const Main: React.FC<MainProps> = ({
  chats,
  userName,
  requests,
  messages,
  setMessage,
  setMessages,
  setRequest,
  setChat,
  deleteRequest,
}) => {
  const [messageValue, setMessageValue] = useState('')
  const [friendRequestValue, setFriendRequestValue] = useState('')
  const [currentChat, setCurrentChat] = useState('')
  const [open, setOpen] = React.useState(false)
  const [resMessageType, setResMessageType] = useState<Color>('info')
  const resMessage = useRef('') 

  useEffect(() => {
    socket.on('socket:add-chat-message', (userName: string) =>
      setRequest(userName)
    )
    socket.on('socket:add-chat-response', (res: string) => {
      switch (res) {
        case 'HAS_ALREADY':
          setResMessageType('warning')
          resMessage.current = 'Пользователь уже есть в списке ваших друзей'
          setOpen(true)  
          break
        case 'NOT_FOUND':
          setResMessageType('error')
          resMessage.current = 'Пользователя с таким именем не существует'
          setOpen(true)  
          break
        case 'SUCCESS':
          setResMessageType('success')
          resMessage.current = 'Успешно!'
          setOpen(true)  
          break
      }  
    })
    socket.on('socket:set-new-chat', (chat: string) => setChat(chat))
    socket.on('socket:set-message', (message: any) => setMessage(message))
    socket.on('socket:set-messages', (messages: any) => {
      setMessages(messages)
    })
  }, [])

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const socketConnectionHandler = (newChatID: string) => {
    socket.emit('socket:join-to-chat', {
      prevChatID: currentChat,
      newChatID: newChatID,
    })
    setCurrentChat(newChatID)
  }

  const submitRequestHandler = (user: string) => {
    deleteRequest(user)
    socket.emit('socket:add-chat-request-success', {
      potentialFriendName: user,
    })
  }

  const sendMessageHandler = () => {
    const currentDate: Date = new Date()
    const message = {
      userName,
      text: messageValue,
      date: `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`,
    }
    socket.emit('socket:send-message', { message })
    setMessageValue('')
  }

  const addChatHandler = () => {
    socket.emit('socket:add-chat-request', {
      potentialFriendName: friendRequestValue,
    })
    setFriendRequestValue('')
  }

  return (
    <>
      <Head>
        <title>Chat-App | Ваши чаты</title>
      </Head>
      <div className={classes.root}>
        <section className={classes.chats}>
          <h3>Ваши чаты: </h3>
          {chats.length === 0 ? (
            <div className={classes.emptyList}>
              <SadIcon />
              <h3 className={classes.emptyFriendList}>
                Список ваших чатов пока пуст.
              </h3>
            </div>
          ) : (
            <div className={classes.list}>
              {chats.map((chat) => (
                <ChatCard
                  chat={chat}
                  key={chat.chatID}
                  connectionHandler={socketConnectionHandler}
                />
              ))}
            </div>
          )}
          <h3>Заявки в друзья:</h3>
          {requests.length === 0 ? (
            <div className={classes.emptyList}>
              <SearchIcon />
              <h3 className={classes.emptyFriendList}>
                Новых заявок пока нет.
              </h3>
              <h4 className={classes.emptyFriendList}>
                Введите имя своего друга и добавьте его в список своих
                контактов.
              </h4>
            </div>
          ) : (
            <div className={classes.list}>
              {requests.map((request, index) => (
                <AddChatCard
                  name={request}
                  key={request + index}
                  addChat={submitRequestHandler}
                />
              ))}
            </div>
          )}
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert severity={resMessageType} onClose={handleClose}>
              {resMessage.current}
            </Alert>
          </Snackbar>
          <AddChatInput
            value={friendRequestValue}
            onChangeHandler={setFriendRequestValue}
            addChatHandler={addChatHandler}
          />
        </section>
        <section className={classes.mainChat}>
          {!currentChat ? (
            <div className={classes.emptyChatArea}>
              <ChatIcon />
              <h3>Выберете чат слева чтобы начать диалог</h3>
            </div>
          ) : (
            <>
              <div className={classes.chatArea}>
                {messages.length === 0 ? (
                  <div className={classes.emptyChatArea}>
                    <EmptyChatIcon />
                    <h3>Список сообщений пока пуст.</h3>
                    <h4>Отправьте свое первое сообщение.</h4>
                  </div>
                ) : (
                  messages.map((message, index) => (
                    <Message
                      text={message.text}
                      author={
                        userName === message.userName ? 'you' : message.userName
                      }
                      key={message.text + index}
                      date={message.date}
                    />
                  ))
                )}
              </div>
              <SendMessageInput
                value={messageValue}
                setMessageValue={setMessageValue}
                sendMessageHandler={sendMessageHandler}
              />
            </>
          )}
        </section>
      </div>
    </>
  )
}

const mapState = (state: InitialState) => ({
  chats: state.chats,
  userName: state.userName,
  messages: state.messages,
  requests: state.requests,
})

const mapDispatch = (dispatch) => ({
  setMessage: (message: IMessage) => dispatch(setMessage(message)),
  setRequest: (request: string) => dispatch(setRequest(request)),
  setChat: (chat: string) => dispatch(setChat(chat)),
  deleteRequest: (request: string) => dispatch(deleteRequest(request)),
  setMessages: (messages: any) => dispatch(setMessages(messages)),
})

export default connect(mapState, mapDispatch)(Main)
