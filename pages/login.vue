<template>
  <div style="height: 100vh;" class="d-flex align-center justify-center pointer" @click="login">
    <div class="w-75">
      <!-- <v-img src="/images/logo.png" contain max-width="800" class="ma-auto" />
        <v-img src="/images/logo.gif" max-width="100" class="ma-auto" /> -->
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
      authorizeUrl: '/oauth2/authorize',
      authen: null
    }
  },
  head () {
    return {
      title: 'Login'
    }
  },
  async beforeMount () {
    const authen = await this.$axios.$get('https://mis-api.cmu.ac.th/mis/lineapp/authorize')
    this.authen = authen
    window.location = authen.data
  },
  methods: {
    login () {
      window.location = this.authen.data
    }
  }
}
</script>
