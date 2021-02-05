import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import { IconButton } from '@material-ui/core'
import DoneIcon from '@material-ui/icons/Done'
import CloseIcon from '@material-ui/icons/Close'
import { User } from '../types/User'

type Props = {
  userData: User
  handleSubmitFriend: (user: string) => void
  handleCancelFriend: (user: string) => void
}

const RequestList: React.FC<Props> = ({
  userData,
  handleSubmitFriend,
  handleCancelFriend
}) => {
  return (
    <>
      {userData.requests.map(user => (
        <ListItem>
          <ListItemIcon>
            <Avatar>{user[0]}</Avatar>
          </ListItemIcon>
          <ListItemText primary={user}>{user}</ListItemText>
          <IconButton onClick={() => handleSubmitFriend(user)}>
            <DoneIcon color='primary' />
          </IconButton>
          <IconButton onClick={() => handleCancelFriend(user)}>
            <CloseIcon color='secondary' />
          </IconButton>
          <ListItemText secondary='request' align='right' />
        </ListItem>
      ))}
    </>
  )
}

export default RequestList
