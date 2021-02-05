import { Request, Response } from 'express'
import Users from '../schemas/UserSchema'
import Chats from '../schemas/ChatSchema'
import { User } from '../../types/User'
import { Chat } from '../../types/Chat'

export const sendAddFriendRequest = async (req: Request, res: Response) => {
  const { username, friendName } = req.body

  if (username && friendName) {
    try {
      const friend: User = await Users.findOne({ username: friendName })

      if (friend) {
        if (friend.friends.find(user => user.username === username)) {
          res.status(200).send('You are already on his/her friend list')
        } else {
          await Users.findOneAndUpdate(
            {
              username: friendName
            },
            {
              $push: { requests: username }
            }
          )

          res.status(200).send('Success')
        }
      } else {
        res.status(200).send('User cannot be find')
      }
    } catch {
      res.status(500).send('Unable find friend (Database error)')
    }
  } else {
    res.status(400).send('Empty username or friendName value')
  }
}

export const submitAddFriendRequest = async (req: Request, res: Response) => {
  const { username, friendName } = req.body

  if (username && friendName) {
    try {
      const newChat: Chat = await new Chats({
        users: [username, friendName]
      }).save()

      await Users.findOneAndUpdate(
        { username },
        {
          $pull: { requests: friendName },
          $push: {
            friends: {
              username: friendName,
              chatID: newChat._id
            }
          }
        }
      )

      await Users.findOneAndUpdate(
        { username: friendName },
        {
          $push: {
            friends: {
              username: username,
              chatID: newChat._id
            }
          }
        }
      )

      res.status(200).send(newChat._id)
    } catch {
      res.status(500).send('Unable add friend (Database error)')
    }
  } else {
    res.status(400).send('Empty username or friendName value')
  }
}

export const cancelAddFriendRequest = async (req: Request, res: Response) => {
  const { username, friendName } = req.body

  if (username && friendName) {
    try {
      await Users.findOneAndUpdate(
        { username },
        {
          $pull: { requests: friendName }
        }
      )

      res.status(200).send('Success')
    } catch {
      res.status(500).send('Unable add friend (Database error)')
    }
  } else {
    res.status(400).send('Empty username or friendName value')
  }
}
