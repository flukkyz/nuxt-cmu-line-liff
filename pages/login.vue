<template>
  <a :href="authorizeUrl">
    <div style="height: 100vh;" class="d-flex align-center justify-center">
      <div class="w-75">
        <!-- <v-img src="/images/logo.png" contain max-width="800" class="ma-auto" />
        <v-img src="/images/logo.gif" max-width="100" class="ma-auto" /> -->
        <h1 class="display-1 info--text text-center">
          Click for Login
        </h1>
      </div>

    </div>
  </a>
</template>

<script>
export default {
  layout: 'empty',
  // middleware: 'guest',
  data () {
    return {
      authorizeUrl: '/oauth2/authorize'
    }
  },
  head () {
    return {
      title: 'Login'
    }
  }
}
</script>
