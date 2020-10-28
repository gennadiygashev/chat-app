import classes from './ChatCard.module.scss'
import { Avatar } from "@material-ui/core"

const ChatCard = ({ chat, connectionHandler }) => (
  <div className={classes.cardRoot} onClick={() => connectionHandler(chat.chatID)}>
    <Avatar className={classes.avatar}>
      { chat.userName[0].toUpperCase() }
    </Avatar>
    {chat.userName}
  </div>
)

export default ChatCard