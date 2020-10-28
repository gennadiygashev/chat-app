import classes from './Message.module.scss'
import { Chip } from "@material-ui/core"

interface MessageProps {
  text: string
  author: string
  date: any
}

const Message: React.FC<MessageProps> = ({text, author, date}) => {
  return (
    <div className={author === 'you' ? `${classes.messageWrapper} ${classes.yourMessageWrapper}` : classes.messageWrapper} >
      <div className={classes.author}>
        {
          author === 'you' ?
          'Вы' :
          author
        }
      </div>
      <Chip 
        label={text} 
        className={author === 'you' ? `${classes.message} ${classes.yourMessage}` : classes.message} 
      />
      <div className={classes.sendTime}>{date}</div>
    </div>
  )
}
export default Message