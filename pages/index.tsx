import Head from 'next/head'
import { useState } from 'react'
import classes from '../styles/index.module.scss'
import { Button, TextField, Typography } from '@material-ui/core'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import { serverURL } from '../utils/serverURL'
import axios from 'axios'
import { loginAction } from '../redux/actions'
import { User } from '../types/User'
import { connect } from 'react-redux'
import { useRouter } from 'next/router'

type Props = {
  loginAction: (userData: User) => void
}

const Index: React.FC<Props> = ({ loginAction }) => {
  const router = useRouter()
  const [input, setInput] = useState<string>('')

  const handleSubmit = async () => {
    const res = await axios.post(`${serverURL}/auth`, {
      username: input
    })

    if (res.status === 200 || 201) {
      loginAction(res.data)

      await router.push('/main')
    }
  }

  return (
    <>
      <Head>
        <title>Chat-App - Your-Chat</title>
      </Head>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Typography variant='h2'>
            Start <br /> Chat <br /> Now!
          </Typography>
          <div className={classes.form}>
            <TextField
              required
              label='Your name'
              className={classes.textInput}
              variant='outlined'
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <Button
              variant='contained'
              color='primary'
              className={classes.linkButton}
              onClick={handleSubmit}
            >
              <KeyboardArrowRightIcon />
              Let's go!
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

const mapDispatch = dispatch => ({
  loginAction: (userData: User) => dispatch(loginAction(userData))
})

export default connect(null, mapDispatch)(Index)
