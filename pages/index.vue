<template>
  <div>
    <h1 class="display-1 text-center mt-10">
      CMU Line
      <br>
    </h1>
    <pre v-if="q">
        {{ q }}
        {{ $route.query['liff.state'] }}
      </pre>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data () {
    return {
      q: null
    }
  },
  mounted () {
    this.q = this.$route.query
    liff.init({
      liffId: '1656332858-DgV6jA5l'
    }).then(() => {
      if (liff.isLoggedIn()) {
        if (this.$route.query['liff.state'] === '/apps') {
          this.$router.push({ name: 'apps' })
        } else if (this.$route.query['liff.state'] === '/profile') {
          this.$router.push({ name: 'profile' })
        }
      } else {
        liff.login()
      }
    })
  }

}
</script>
