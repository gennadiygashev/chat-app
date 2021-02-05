import { Request, Response } from 'express'
import Users from '../schemas/UserSchema'
import { User } from '../../types/User'

const auth = async (req: Request, res: Response) => {
  const { username } = req.body

  if (username) {
    try {
      const user: User = await Users.findOne({ username })

      if (user) {
        res.status(200).send(user)
      } else {
        const newUser = await new Users({ username }).save()

        if (newUser) {
          res.status(201).send(newUser)
        } else {
          res.status(500).send('Unable to create user (Database error)')
        }
      }
    } catch {
      res.status(500).send('Unable to create user (Database error)')
    }
  } else {
    res.status(400).send('Empty username value')
  }
}

export default auth
