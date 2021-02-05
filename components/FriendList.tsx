import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import { User } from '../types/User'

type Props = {
  userData: User
  handleClick: (chatID: string) => void
}

const FriendList: React.FC<Props> = ({ userData, handleClick }) => {
  return (
    <>
      {userData.friends.map(user => (
        <ListItem button onClick={() => handleClick(user.chatID)}>
          <ListItemIcon>
            <Avatar>{user.username[0]}</Avatar>
          </ListItemIcon>
          <ListItemText primary={user.username}>{user.username}</ListItemText>
          <ListItemText secondary='friend' align='right' />
        </ListItem>
      ))}
    </>
  )
}

export default FriendList
