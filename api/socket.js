const app = require('express')()
const socket = require('socket.io')
let server = null
let io = null

app.all('/', (req, res) => {
  if (!server) {
    server = res.connection.server
    io = socket(server)
    
    io.on('connection', function (socket) {
      // connected io success
      console.log('connected : ID =>', socket.id)

      socket.on('disconnect', () => {
        console.log(`user ${socket.id} disconnected`);
      })
    })

  }

  res.json({ msg: 'server is set' })
})



module.exports = {
  path: '/socket.io',
  handler: app
}
