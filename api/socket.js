const app = require('express')()
const socket = require('socket.io')
let server = null
let io = null

app.all('/', (req, res) => {
  if (!server) {
    server = res.connection.server
    io = socket(server, {
      cors: {
        origin: '*',
      }
    })
    
    io.on('connection', function (socket) {
      // connected io success
      console.log('Connected : ID =>', socket.id)
      
      socket.on('disconnect', () => {
        console.log('Disconnected : ID =>', socket.id)
      });
    
      socket.on('sendMessage', (msg) => {
        io.emit('sendMessage', msg)
      })
    })

  }

  res.json({ msg: 'server is set' })
})



module.exports = {
  path: '/socket.io',
  handler: app
}
