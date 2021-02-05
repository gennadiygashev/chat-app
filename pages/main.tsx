import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import classes from '../styles/main.module.scss'
import { State } from '../redux/reducer'
import { connect } from 'react-redux'
import { User } from '../types/User'
import MessageArea from '../components/MessageArea'
import { Chat } from '../types/Chat'
import axios from 'axios'
import { serverURL } from '../utils/serverURL'
import {
  addFriend,
  chatAction,
  delRequest,
  MessageAction,
  updateAction
} from '../redux/actions'
import { useState } from 'react'
import io from 'socket.io-client'
import { ADD_MESSAGE } from '../redux/constants'
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { useRouter } from 'next/router'
import FriendList from '../components/FriendList'
import RequestList from '../components/RequestList'

type Props = {
  userData: User | null
  chatData: Chat | null
  chatAction: (chatData: Chat) => void
  updateAction: (res: MessageAction) => void
  addFriend: (res: { username: string; chatID: string }) => void
  delRequest: (res: string) => void
}

const Main: React.FC<Props> = ({
  userData,
  chatData,
  chatAction,
  updateAction,
  addFriend,
  delRequest
}) => {
  const router = useRouter()
  const [input, setInput] = useState<string>('')
  const [friendInput, setFriendInput] = useState<string>('')
  const [friendInputErr, setFriendInputErr] = useState<string>('')
  const [socket, setSocket] = useState<any>()

  if (!userData) router.push('/')

  const handleSubmit = async () => {
    if (input.length > 0) {
      const timeNow = String(new Date())

      await axios.post(`${serverURL}/send-message`, {
        message: input,
        username: userData.username,
        chatID: chatData._id
      })

      socket.emit('update', {
        type: ADD_MESSAGE,
        payload: {
          text: input,
          username: userData.username,
          date: timeNow
        }
      })
    }

    setInput('')
  }

  const socketConnect = (chatID: string) => {
    socket && socket.disconnect()

    const initSocket = io('ws://localhost:3001', {
      transports: ['websocket'],
      query: {
        chatID
      },
      timeout: 25000
    })

    setSocket(initSocket)

    initSocket.on('connect', () => {
      console.log('Socket connected')
    })

    initSocket.on('disconnect', (reason: string) => {
      console.log('Socket disconnected because:', reason)
    })

    initSocket.on('reconnect_attempt', () => {
      socket.io.opts.transports = ['polling', 'websocket']
    })

    initSocket.on('update', (data: any) => {
      updateAction({ type: data.type, payload: data.payload })
    })
  }

  const handleClick = async (chatID: string) => {
    const res = await axios.get(`${serverURL}/chat`, {
      params: {
        chatID
      }
    })

    chatAction(res.data)
    socketConnect(chatID)
  }

  const handleAddFriend = async () => {
    if (friendInput.length > 0) {
      const res = await axios.post(`${serverURL}/send-add-friend-request`, {
        username: userData.username,
        friendName: friendInput
      })

      setFriendInputErr(res.data)
    }
  }

  const handleSubmitFriend = async (friend: string) => {
    const id = await axios.post(`${serverURL}/submit-add-friend-request`, {
      username: userData.username,
      friendName: friend
    })

    addFriend({
      username: friend,
      chatID: id.data
    })
  }

  const handleCancelFriend = (friend: string) => {
    axios.post(`${serverURL}/cancel-add-friend-request`, {
      username: userData.username,
      friendName: friend
    })

    delRequest(friend)
  }

  return (
    <div className={classes.root}>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem>
              <ListItemIcon>
                <Avatar>{userData.username[0]}</Avatar>
              </ListItemIcon>
              <ListItemText primary={userData.username} />
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: '10px' }}>
            <FormControl
              variant='outlined'
              fullWidth
              error={friendInputErr.length > 0}
            >
              <InputLabel htmlFor='outlined-adornment-password'>
                Add friend
              </InputLabel>
              <OutlinedInput
                id='outlined-basic-email'
                label='Add friend'
                onChange={e => {
                  setFriendInput(e.target.value)
                  setFriendInputErr('')
                }}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton onClick={handleAddFriend}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error={friendInputErr.length > 0}>
                {friendInputErr}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Divider />
          <List>
            <FriendList userData={userData} handleClick={handleClick} />
            <RequestList
              userData={userData}
              handleSubmitFriend={handleSubmitFriend}
              handleCancelFriend={handleCancelFriend}
            />
          </List>
        </Grid>
        {chatData ? (
          <MessageArea
            chat={chatData}
            username={userData.username}
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
          />
        ) : null}
      </Grid>
    </div>
  )
}

const mapState = (state: State) => ({
  userData: state.user,
  chatData: state.chat
})

const mapDispatch = dispatch => ({
  chatAction: (chatData: Chat) => dispatch(chatAction(chatData)),
  updateAction: (res: MessageAction) => dispatch(updateAction(res)),
  addFriend: (res: { username: string; chatID: string }) =>
    dispatch(addFriend(res)),
  delRequest: (res: string) => dispatch(delRequest(res))
})

export default connect(mapState, mapDispatch)(Main)
