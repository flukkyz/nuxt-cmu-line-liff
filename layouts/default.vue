<template>
  <v-app dark>
    <layouts-sidebar />
    <layouts-topbar />
    <v-main>
      <v-container class="py-0 my-0">
        <breadcrumbs />
        <nuxt />
      </v-container>
    </v-main>
    <!-- <Footer /> -->
    <snackbar />
    <overlay />
    <b-t-t />
  </v-app>
</template>

<script>
export default {
  name: 'Default',
  data () {
    return {
      socket: null
    }
  },
  created () {
    this.connectSocket()
    this.$bus.$on('socket-send', (data) => {
      console.log('SOCKET SEND')
      if (this.socket.readyState === WebSocket.OPEN) {
        console.log('SEND')
        this.socket.send(JSON.stringify(data))
      } else {
        setTimeout(() => {
          console.log('SEND 1 S')
          this.socket.send(JSON.stringify(data))
        }, 1000)
      }
    })
  },
  beforeDestroy () {
    this.$bus.$off('socket-send')
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
            this.$bus.$emit('socket-receive', eventData)
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

<style lang="scss">
  .v-application {
    background-color: #FFF !important;
  }
  .text-field-right{
    .v-text-field__slot{
    input{
      text-align: right !important;
    }
    }
  }
  .pointer {
    cursor: pointer;
  }
  .on-center{
    position: absolute !important;
    transform: translate(-50%,-50%) !important;
  }
  .w-100{
    width: 100%;
  }
  .w-90{
    width: 90%;
  }
  .w-80{
    width: 80%;
  }
  .w-75{
    width: 75%;
  }
  .w-70{
    width: 70%;
  }
  .w-65{
    width: 65%;
  }
  .w-50{
    width: 50%;
  }
  .w-35{
    width: 35%;
  }
  .w-30{
    width: 30%;
  }
  .w-25{
    width: 25%;
  }
  .w-20{
    width: 20%;
  }
  .w-10{
    width: 10%;
  }
  .h-100{
    height: 100%;
  }
  .h-75{
    height: 75%;
  }
  .h-70{
    height: 70%;
  }
  .h-65{
    height: 65%;
  }
  .h-50{
    height: 50%;
  }
  .h-25{
    height: 25%;
  }
  a:hover,
  a:visited,
  a:link,
  a:active {
      text-decoration: none;
  }
  .top-items{
    align-items: flex-start;
  }
  .center-items{
    align-items: center;
  }
  .bottom-items{
    align-items: flex-end;
  }
  .small{
    font-size: 0.7rem !important;
  }
  .very-small{
    font-size: 0.6rem !important;
  }
  .translucent{
    background-color: rgba(255, 255, 255, 0.1);
  }
</style>
