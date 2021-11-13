<template>
  <div>
    <div />
  </div>
</template>

<script>
export default {
  data () {
    return {
      socket: null,
      timeInterval: null
    }
  },
  created () {
    this.connectSocket()

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'socket/send') {
        this.timeInterval = setInterval(() => {
          if (this.socket.readyState === WebSocket.OPEN) {
            clearInterval(this.timeInterval)
            console.log('SEND', state.socket.dataSend)
            this.sendSocket(state.socket.dataSend)
          }
        }, 10)
      }
    })
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
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
          this.$store.commit('socket/receive', eventData)
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
    },
    sendSocket (data) {
      this.socket.send(JSON.stringify(data))
    }
  }
}
</script>
