import Grid from '@material-ui/core/Grid'
import classes from '../styles/InputArea.module.scss'
import TextField from '@material-ui/core/TextField'
import Fab from '@material-ui/core/Fab'
import SendIcon from '@material-ui/icons/Send'

type Props = {
  handleSubmit: () => void
  input: string
  setInput: (text: string) => void
}

const InputArea: React.FC<Props> = ({ handleSubmit, input, setInput }) => {
  return (
    <Grid container className={classes.inputArea}>
      <Grid item xs={11}>
        <TextField
          id='outlined-basic-email'
          label='Type Something'
          fullWidth
          onChange={e => setInput(e.target.value)}
          value={input}
          autoComplete='off'
        />
      </Grid>
      <Grid xs={1} align='right'>
        <Fab color='primary' onClick={handleSubmit}>
          <SendIcon />
        </Fab>
      </Grid>
    </Grid>
  )
}

export default InputArea
