import classes from './AddChatCard.module.scss'
import { Avatar, IconButton } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';

const AddChatCard = ({ name, addChat }) => (
  <div className={classes.card}>
    <div className={classes.infoSection}>
      <Avatar className={classes.avatar}>
        <PersonIcon />
      </Avatar>
      <p>{name}</p>
    </div>
    <IconButton size='small' className={classes.addButton} onClick={() => addChat(name)}>
      <AddIcon />
    </IconButton>
  </div>
)

export default AddChatCard