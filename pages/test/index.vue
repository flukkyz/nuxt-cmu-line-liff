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
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data () {
    return {
      callApi: false,
      datas: null,
      profile: null
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
          this.$axios.$get(`http://101e-2403-6200-8851-44f8-118a-a804-6904-ce4.ngrok.io/api/users/${profile.userId}`).then((res) => {
            this.callApi = true
            this.datas = res
          }).catch((err) => {
            this.callApi = true
            this.datas = err
          })
        })
      } else {
        liff.login()
      }
    })
  }

}
</script>
