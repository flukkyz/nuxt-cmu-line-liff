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
      socket: null,
      messages: ['123', '1236']
    }
  },

  mounted () {
    this.socket = this.$socket(process.env.baseUrl)
    this.socket.on('sendMessage', (msg) => {
      this.messages.push(msg)
    })
  },
  methods: {
    save () {
      this.socket.emit('sendMessage', this.message)
      this.message = ''
    }
  }

}
</script>
