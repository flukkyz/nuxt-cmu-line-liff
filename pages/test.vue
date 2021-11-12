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
    1
    <pre>
    {{ dddd }}

    </pre>
    1
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: '',
      valid: true,
      dddd: '2222222222222222222',
      connection: null,
      messages: ['123', '1236']
    }
  },

  mounted () {
    console.log('Starting connection to WebSocket Server')
    this.connection = new WebSocket('wss://mis-api.cmu.ac.th/mis/lineapp/ws/api', 'protocol')

    this.connection.onmessage = (event) => {
      try {
        this.dddd = JSON.parse(event.data)
      } catch (error) {

      }
    }

    this.connection.onopen = (event) => {
      console.log(event)
      console.log('Successfully connected to the echo websocket server...')
    }
  },
  methods: {
    aaaa (event) {
      console.log(event)
    },
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
