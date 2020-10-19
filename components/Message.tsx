import classes from './Message.module.scss'
import { Chip } from "@material-ui/core"

interface MessageProps {
  text: string
  author: 'you' | 'interlocutor'
}

const Message: React.FC<MessageProps> = ({text, author}) => {
  return (
    <Chip 
      label={text} 
      className={author === 'you' ? `${classes.message} ${classes.yourMessage}` : classes.message} 
    />
  )
}

export default Message