import { Request, Response } from 'express'
import Chats from '../schemas/ChatSchema'
import { Message } from '../../types/Chat'

const sendMessage = async (req: Request, res: Response) => {
  const { username, chatID, message } = req.body

  if (message && username && chatID) {
    try {
      const messageObj: Message = {
        text: message,
        date: String(new Date()),
        username
      }

      await Chats.findOneAndUpdate(
        { _id: chatID },
        {
          $push: {
            messages: messageObj
          }
        }
      )

      res.status(200).send('Success')
    } catch {
      res.status(500).send('Unable to send message (Database error)')
    }
  } else {
    res.status(400).send('Empty message, username or chatID value')
  }
}

export default sendMessage
