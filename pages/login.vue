<template>
  <div style="height: 100vh;" class="d-flex align-center justify-center pointer" @click="login">
    <div class="w-75">
      <v-img src="/images/logo.png" contain max-width="300" class="ma-auto" />
      <h1 class="display-1 info--text text-center">
        Click for Login
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  middleware: 'guest',
  data () {
    return {
      authen: null
    }
  },
  head () {
    return {
      title: 'Login'
    }
  },
  async beforeMount () {
    const authen = await this.$axios.$get(`${process.env.apiUrl}${process.env.oAuthAuthorize}`)
    this.authen = authen
    window.location = 'https://oauth.cmu.ac.th/v2/Authorize.aspx?response_type=code&client_id=rpEMTy5zwWwVtnXhMcpTbj7w5Q3sRb6JR9ytH0Fu&redirect_uri=https%3A%2F%2Fliff.line.me%2F1656332858-DgV6jA5l%2Fauth%2F&scope=cmuitaccount.basicinfo&state=admin'

    // window.location = authen.data
  },
  methods: {
    login () {
      window.location = this.authen.data
    }
  }
}
</script>
