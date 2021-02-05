import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import classes from '../styles/MessageArea.module.scss'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import { Chat, Message } from '../types/Chat'
import InputArea from './InputArea'

type Props = {
  chat: Chat
  username: string
  input: string
  setInput: (text: string) => void
  handleSubmit: () => void
}

const MessageArea: React.FC<Props> = ({
  chat,
  username,
  input,
  setInput,
  handleSubmit
}) => {
  return (
    <Grid item xs={9}>
      <List className={classes.messageArea}>
        {chat.messages.map((mes: Message) => (
          <ListItem key={mes._id}>
            <Grid container>
              <Grid item xs={12}>
                <ListItemText
                  align={mes.username === username ? 'right' : null}
                  primary={mes.text}
                />
              </Grid>
              <Grid item xs={12}>
                <ListItemText
                  align={mes.username === username ? 'right' : null}
                  secondary={mes.date}
                />
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
      <Divider />
      <InputArea
        handleSubmit={handleSubmit}
        input={input}
        setInput={setInput}
      />
    </Grid>
  )
}

export default MessageArea
