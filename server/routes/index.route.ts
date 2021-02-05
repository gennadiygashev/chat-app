import { Router } from 'express'
import auth from './auth.route'
import {
  sendAddFriendRequest,
  submitAddFriendRequest,
  cancelAddFriendRequest
} from './addFriend.route'
import sendMessage from './sendMessage.route'
import chat from './chat.route'

const router: Router = Router()

router.post('/auth', auth)

router.get('/chat', chat)

router.post('/send-add-friend-request', sendAddFriendRequest)

router.post('/submit-add-friend-request', submitAddFriendRequest)

router.post('/cancel-add-friend-request', cancelAddFriendRequest)

router.post('/send-message', sendMessage)

export default router
