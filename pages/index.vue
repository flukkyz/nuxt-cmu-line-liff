<template>
  <div>
    <h1>Hello</h1>
    <pre v-if="profile">
      {{ profile }}
    </pre>
    <p>
      call API : {{ callApi ? 'T' : 'F' }}
    </p>
    <pre v-if="datas">
      {{ datas }}
    </pre>
    <p>authen</p>
    <pre v-if="authen">
      {{ authen }}
    </pre>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data () {
    return {
      callApi: false,
      datas: null,
      profile: null,
      authen: null
    }
  },
  mounted () {
    this.q = this.$route.query
    liff.init({
      liffId: '1656332858-DgV6jA5l'
    }).then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then(async (profile) => {
          this.profile = profile
          const url = `https://mis-api.cmu.ac.th/mis/lineapp/api/users/${profile.userId}`
          const acc = await this.$axios.$get(url)
          this.callApi = true
          this.datas = acc
          if (acc.status === 'ok') {
            if (this.$route.query['liff.state'] === '/apps') {
              this.$router.push({ name: 'apps' })
            } else if (this.$route.query['liff.state'] === '/profile') {
              this.$router.push({ name: 'profile' })
            }
          } else {
            const authen = await this.$axios.$get('https://mis-api.cmu.ac.th/mis/lineapp/authorize')
            this.authen = authen
            window.location = authen.data
          }
        })
      } else {
        liff.login()
      }
    })
  }

}
</script>
