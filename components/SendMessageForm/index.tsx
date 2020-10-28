import { Button, TextField } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import classes from './SendMessageForm.module.scss'

interface ISendMessageForm {
  value: string
  setMessageValue: (string: string) => void
  sendMessageHandler: () => void
}

const SendMessageForm: React.FC<ISendMessageForm> = ({ value, setMessageValue, sendMessageHandler }) => (
  <div className={classes.sendForm}>
    <TextField
      variant="outlined"
      className={classes.sendInput}
      onChange={(e) => setMessageValue(e.target.value)}
      value={value}
      label={'Написать...'}
    />
    <Button
      variant="contained"
      color="primary"
      className={classes.sendButton}
      endIcon={<SendIcon />}
      onClick={() => sendMessageHandler()}
    >
      Отправить
    </Button>
  </div>
)

export default SendMessageForm
