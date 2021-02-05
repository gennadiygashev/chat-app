import { Request, Response } from 'express'
import Chats from '../schemas/ChatSchema'

const chat = async (req: Request, res: Response) => {
  const { chatID } = req.query

  if (chatID) {
    try {
      const chat = await Chats.findOne({ _id: chatID })

      res.status(200).send(chat)
    } catch {
      res.status(500).send('Unable to receive chat (Database error)')
    }
  } else {
    res.status(400).send('Empty chatID value')
  }
}

export default chat
