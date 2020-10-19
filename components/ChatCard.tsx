import classes from './ChatCard.module.scss'
import { Avatar, Card, CardHeader } from "@material-ui/core"

const ChatCard = ({ name }) => (
  <Card className={classes.cardRoot}>
    <CardHeader
      avatar={
        <Avatar>
          { name[0].toUpperCase() }
        </Avatar>
      }
      title={name}
    />
  </Card>
)

export default ChatCard