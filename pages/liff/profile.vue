<template>
  <div v-if="profile" class="text-center">
    <v-img :src="profile.pictureUrl" contain />
    <p class="caption teal--text mt-2">
      {{ profile.displayName }}
    </p>
    <p class="title mb-1">
      {{ `${profile.firstname} ${profile.lastname}` }}
    </p>
    <p class="subtitle-1 mb-1">
      <v-icon small>
        fas fa-briefcase
      </v-icon>
      {{ `${profile.organizationname}` }}
    </p>
    <p class="subtitle-1 mb-6">
      <v-icon small>
        fas fa-envelope
      </v-icon>
      {{ `${profile.email}` }}
    </p>
    <v-btn depressed class="mb-4" color="primary" @click="getLocation">
      ส่งพิกัด
    </v-btn>
    <v-btn outlined @click="close">
      ปิด
    </v-btn>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data () {
    return {
      profile: null,
      timeoutCheckUser: null,
      popupWindow: ''
    }
  },
  created () {
    this.$overlay.showLoading()
  },
  async beforeMount () {
    await liff.init({ liffId: process.env.liffID })
    if (liff.isInClient()) {
      this.getLineProfile()
    } else if (liff.isLoggedIn()) {
      this.getLineProfile()
    } else {
      liff.login({ redirectUri: window.location.href })
    }
  },
  beforeDestroy () {
    this.timeoutCheckUser && clearTimeout(this.timeoutCheckUser)
  },
  methods: {
    async getLineProfile (redirect = true) {
      const profile = await liff.getProfile()
      const urlCheckIsUser = `${process.env.apiUrl}${process.env.apiDirectory}users/lineid/${profile.userId}`
      const user = await this.$axios.$get(urlCheckIsUser)
      if (user.status === 'ok') {
        if (this.timeoutCheckUser) {
          clearTimeout(this.timeoutCheckUser)
        }
        if (this.popupWindow) {
          await this.popupWindow.close()
        }
        this.profile = {
          ...profile,
          ...user.data
        }
        this.$overlay.hide()
      } else {
        this.timeoutCheckUser = setTimeout(() => {
          this.getLineProfile(false)
        }, 3000)
        if (redirect) {
          const authen = await this.$axios.$get(`${process.env.apiUrl}${process.env.oAuthAuthorize}?page=${this.$route.path.replace('/liff/', '')}`)
          this.popupWindow = window.open(authen.data, '_self')
        }
      }
    },
    getLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          this.$notifier.showMessage({ title: 'OK', content: `${pos.coords.latitude},${pos.coords.longitude}`, color: 'success' })
        }, (err) => {
          this.$notifier.showMessage({ title: 'Error', content: err.message, color: 'error' })
        })
      } else {
        this.$notifier.showMessage({ title: 'Error', content: 'Geolocation is not supported by this browser.', color: 'error' })
      }
    },
    close () {
      liff.closeWindow()
    }
  }
}
</script>
