import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import socket from '../utils/socket'
import { joinedToService, setData } from '../store/actions'
import classes from '../styles/index.module.scss'
import { Button, TextField, Typography } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'

interface IndexProps {
  setData: (chats: any[], requests: any[]) => void
  joinedToService: (userName: string) => void
}

const Index: React.FC<IndexProps> = ({ setData, joinedToService }) => {
  const [userName, setNickname] = useState('')
  const router = useRouter()

  const onLogin = async () => {
    joinedToService(userName)
    socket.emit('socket:join-to-userpage', {
      userName,
    })
    const { data } = await axios.get(`http://localhost:3001/users/${userName}`)
    setData(data.chats, data.requests)
    router.push(`/main`)
  }

  const onSubmit = async () => {
    if (!userName) {
      return alert('Необходимо ввести ваше имя!')
    }
    await axios.post('http://localhost:3001/users', { userName }).then(onLogin)
  }

  return (
    <>
      <Head>
        <title>Chat-App - Ваш выбор для быстрой работы</title>
      </Head>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Typography variant="h2">
            Начните <br /> беседу <br /> сейчас!
          </Typography>
          <div className={classes.form}>
            <TextField
              required
              label="Ваше имя"
              className={classes.textInput}
              variant='outlined'
              value={userName}
              onChange={(e) => setNickname(e.target.value)}
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
  setData: (chats: any[], requests: any[]) => dispatch(setData(chats, requests)),
  joinedToService: (userName: string) => dispatch(joinedToService(userName)),
})

export default connect(null, mapDispatch)(Index)
