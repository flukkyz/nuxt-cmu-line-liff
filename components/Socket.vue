<template>
  <div>
    <div />
  </div>
</template>

<script>
export default {
  data () {
    return {
      socket: null
    }
  },
  created () {
    this.connectSocket()

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'socket/send') {
        console.log('SOCKET SEND')
        if (this.socket.readyState === WebSocket.OPEN) {
          console.log('SEND')
          this.socket.send(JSON.stringify(state.socket.dataSend))
        } else {
          setTimeout(() => {
            console.log('SEND 1 S')
            this.socket.send(JSON.stringify(state.socket.dataSend))
          }, 1000)
        }
      }
    })
  },
  methods: {
    connectSocket () {
      this.socket = new WebSocket('wss://mis-api.cmu.ac.th/mis/lineapp/ws/api', 'protocol')
      this.socket.onopen = () => {
        console.log('Socket Connected')
      }

      this.socket.onmessage = (e) => {
        console.log('Message:', e.data)
        try {
          const eventData = JSON.parse(e.data)
          if (eventData.type === 'text') {
            this.$store.commit('socket/receive', eventData)
          } else {
            console.log(eventData)
          }
        } catch (error) { }
      }

      this.socket.onclose = (e) => {
        console.log('Socket is closed. Reconnect will be now.', e.reason)
        setTimeout(() => {
          this.connectSocket()
        }, 1)
      }

      this.socket.onerror = (err) => {
        console.error('Socket encountered error: ', err.message, 'Closing socket')
        this.socket.close()
      }
    }
  }
}
</script>
