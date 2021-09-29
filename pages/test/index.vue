<template>
  <div>
    <h1>Hello</h1>
    <pre v-if="profile">
      {{ profile }}
    </pre>
    <p>
      call API : {{ callApi ? 'T' : 'F' }}
      <br>
      {{ url }}
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
      profile: null,
      url: ''
    }
  },
  mounted () {
    this.q = this.$route.query
    liff.init({
      liffId: '1656332858-DgV6jA5l'
    }).then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then((profile) => {
          this.profile = profile
          this.url = `https://mis-api.cmu.ac.th/mis/lineapp/api/users/${profile.userId}`
          this.$axios.$get(this.url).then((res) => {
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
