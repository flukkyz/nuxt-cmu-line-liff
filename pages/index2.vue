<template>
  <div>
    <h1 class="display-1 text-center mt-10">
      CMU Line Datas
      <br>
    </h1>
    <pre v-if="q">
        {{ q }}
        {{ $route.query['liff.state'] }}
    </pre>
    <br>
    <br>
    <br>
    <span v-if="callApi"> call api</span>
    <br>
    <span>
      datas
    </span>
    <pre v-if="datas">
      {{ datas }}
    </pre>
    <br>
    <br>
    <span>
      profile
    </span>
    <pre v-if="profile">
      {{ profile }}
    </pre>
    <pre v-if="$auth.loggedIn">
      {{ $auth.user }}
    </pre>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data () {
    return {
      q: null,
      datas: null,
      callApi: false,
      profile: null
    }
  },
  mounted () {
    this.q = this.$route.query
    console.log('mounted')
    liff.init({
      liffId: '1656332858-DgV6jA5l'
    }).then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then(async (profile) => {
          const acc = await this.$axios.$get(`http://101e-2403-6200-8851-44f8-118a-a804-6904-ce4.ngrok.io/api/users/${profile.userId}`)
          this.callApi = true
          this.datas = acc
        })
        // if (this.$route.query['liff.state'] === '/apps') {
        //   this.$router.push({ name: 'apps' })
        // } else if (this.$route.query['liff.state'] === '/profile') {
        //   this.$router.push({ name: 'profile' })
        // }
      } else {
        liff.login()
      }
    })
  }

}
</script>
