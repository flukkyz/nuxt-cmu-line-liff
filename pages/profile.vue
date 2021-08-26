<template>
  <div v-if="profile">
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
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data () {
    return {
      profile: null
    }
  },
  mounted () {
    this.$overlay.showLoading()
    liff.init({
      liffId: process.env.LiffID
    }).then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then((profile) => {
          this.profile = profile
          this.$overlay.hide()
        })
      } else {
        liff.login()
      }
    })
  }
}
</script>
