import classes from './AddChatInput.module.scss'
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

const AddChatInput = ({ value, onChangeHandler, addChatHandler }) => (
  <FormControl variant="outlined" className={classes.form}>
    <InputLabel>Добавить нового друга!</InputLabel>
    <OutlinedInput
      value={value}
      onChange={(e) => onChangeHandler(e.target.value)}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            edge="end"
            onClick={addChatHandler}
            size="small"
            className={classes.addButton}
          >
            <AddIcon />
          </IconButton>
        </InputAdornment>
      }
      labelWidth={185}
    />
  </FormControl>
)

export default AddChatInput
