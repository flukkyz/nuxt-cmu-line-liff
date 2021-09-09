require('dotenv').config()
const express = require('express')
const cors = require('cors')
const axios = require('axios')

const passport = require('./config/passport')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(passport.initialize())

app.get('/authorize', (req, res) => {
  const data = new URLSearchParams()
  data.append('response_type', 'code')
  data.append('client_id', process.env.OAUTH_CLIENT_ID)
  data.append('redirect_uri', `${process.env.BASE_URL}${process.env.OAUTH_RETURN_URI}`)
  data.append('scope', process.env.OAUTH_SCOPE)
  data.append('state', process.env.OAUTH_STATE)
  res.redirect(`${process.env.OAUTH_URL}${process.env.OAUTH_AUTHORIZE}?${data.toString()}`)
})

app.get('/callback', async (req, res) => {
  const code = req.query.code
  const state = req.query.state
  if (code && state) {
    if (state === process.env.OAUTH_STATE) {
      const method = 'post'
      const url = `${process.env.OAUTH_URL}${process.env.OAUTH_TOKEN}`

      const data = new URLSearchParams()
      data.append('code', code)
      data.append('redirect_uri', `${process.env.BASE_URL}${process.env.OAUTH_RETURN_URI}`)
      data.append('client_id', process.env.OAUTH_CLIENT_ID)
      data.append('client_secret', process.env.OAUTH_CLIENT_SECRET)
      data.append('grant_type', 'authorization_code')

      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }

      try {
        const resData = await axios({
          method,
          url,
          data,
          headers
        })
        return res.json(resData.data)
      } catch (e) {
        return res.status(401).json({
          message: 'Unauthorized'
        })
      }
    }
  }
  return res.status(400).json({
    message: 'Bad request'
  })
})

app.post('/token', async (req, res) => {
  const refreshToken = req.body.refresh_token
  if (refreshToken) {
    const method = 'post'
    const url = `${process.env.OAUTH_URL}${process.env.OAUTH_TOKEN}`

    const data = new URLSearchParams()
    data.append('refresh_token', refreshToken)
    data.append('client_id', process.env.OAUTH_CLIENT_ID)
    data.append('client_secret', process.env.OAUTH_CLIENT_SECRET)
    data.append('grant_type', 'refresh_token')

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    try {
      const resData = await axios({
        method,
        url,
        data,
        headers
      })
      return res.json(resData.data)
    } catch (e) {
      return res.status(401).json({
        message: 'Unauthorized'
      })
    }
  }
  return res.status(400).json({
    message: 'Bad request'
  })
})

app.get('/me', passport.authenticate('bearer', { session: false }), (req, res) => {
  return res.status(200).json(req.user)
})

module.exports = {
  path: '/oauth2',
  handler: app
}
