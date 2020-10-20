import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import socket from '../utils/socket'
import { joinedToRoom, setUsers } from '../store/actions'
import classes from '../styles/index.module.scss'
import { Button, TextField, Typography } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

interface IndexProps {
  joinedToRoom: (roomID: string, userName: string) => void
  setUsers: (users: []) => void
}

const Index: React.FC<IndexProps> = ({ joinedToRoom, setUsers }) => {
  const [userName, setNickname] = useState('')
  const [roomID, setRoomID] = useState('')
  const router = useRouter()

  const onLogin = async () => {
    joinedToRoom(roomID, userName)
    socket.emit('socket:join', {
      roomID,
      userName,
    })
    const { data } = await axios.get(`http://localhost:3001/rooms/${roomID}`)
    setUsers(data.users)
    router.push(`/main/${roomID}`)
  }

  const onSubmit = async () => {
    if (!roomID || !userName) {
      return alert('Одно из полей отсутсвует')
    }
    await axios
      .post('http://localhost:3001/rooms', { userName, roomID })
      .then(onLogin)
  }

  return (
    <>
      <Head>
        <title>Chat-App - Ваш выбор для быстрой работы</title>
      </Head>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Typography variant="h2">Начните беседу сейчас!</Typography>
          <div className={classes.form}>
            <TextField
              required
              label="Ваше имя"
              className={classes.textInput}
              value={userName}
              onChange={(e) => setNickname(e.target.value)}
            />
            <TextField
              required
              label="ID комнаты"
              className={classes.textInput}
              value={roomID}
              onChange={(e) => setRoomID(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.linkButton}
              onClick={onSubmit}
            >
              <KeyboardArrowRightIcon />
              Вперед!
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

const mapDispatch = (dispatch) => ({
  setUsers: (users: []) => dispatch(setUsers(users)),
  joinedToRoom: (roomID: string, userName: string) =>
    dispatch(joinedToRoom(roomID, userName)),
})

export default connect(null, mapDispatch)(Index)
