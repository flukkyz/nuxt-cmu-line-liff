<template>
  <div v-if="profile">
    <p>Q</p>
    <pre v-if="$route.query">
      {{ $route.query }}
    </pre>
    <h1>Page Profile</h1>
    <v-img :src="profile.pictureUrl" contain />
    <p class="mt-3 mb-1 text-center">
      <span class="font-weight-bold">
        User ID:
      </span>
      {{ profile.userId }}
    </p>
    <h2 class="text-center">
      <span class="font-weight-bold">
        Display Name:
      </span>
      {{ profile.displayName }}
    </h2>
    <pre v-if="acc">
      {{ acc }}
    </pre>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data () {
    return {
      profile: null,
      acc: null
    }
  },
  mounted () {
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
            this.acc = acc
          } else {
            const authen = await this.$axios.$get('https://mis-api.cmu.ac.th/mis/lineapp/authorize?page=profile')
            this.authen = authen
            window.location = authen.data
          }
        })
      } else {
        liff.login({ redirectUri: window.location.href })
      }
    })
  }
}
</script>
