<template>
  <div>
    <div v-for="(msg, index) in messages" :key="index" class="message">
      {{ msg }}
    </div>
    <v-form ref="form" v-model="valid" @submit.prevent="save">
      <v-text-field v-model="message" outlined />
      <v-btn elevation="0" outlined color="primary" type="submit">
        Send
      </v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      valid: true,
      connection: null,
      messages: ['123', '1236']
    }
  },

  mounted () {
    console.log('Starting connection to WebSocket Server')
    this.connection = new WebSocket('ws://10.110.1.68:8889', 'protocol')

    this.connection.onmessage = function (event) {
      console.log(event)
    }

    this.connection.onopen = function (event) {
      console.log(event)
      console.log('Successfully connected to the echo websocket server...')
    }
  },
  methods: {
    save () {
      console.log('Hello')
      console.log(this.connection)
      this.connection.send(JSON.stringify({
        id: '12121212',
        type: 'text',
        message: this.message
      }))
    }
  }

}
</script>
