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
    <v-btn outlined @click="close">
      ปิด
    </v-btn>
  </div>
  <div v-else class="">
    <h1>checkTimeout</h1>
    <h2>{{ checkTimeout }}</h2>
    <p class="mb-0">
      Line
    </p>
    <pre>
      {{ logLine }}
    </pre>
    <p class="mb-0">
      User
    </p>
    <pre>
      {{ logUser }}
    </pre>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data () {
    return {
      profile: null,
      timeoutCheckUser: null,
      popupWindow: '',
      checkTimeout: 0,
      logLine: null,
      logUser: null
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
      this.logLine = profile
      const urlCheckIsUser = `${process.env.apiUrl}${process.env.apiDirectory}users/lineid/${profile.userId}`
      const user = await this.$axios.$get(urlCheckIsUser)
      this.logUser = user
      if (user.status === 'ok') {
        if (this.timeoutCheckUser) {
          await this.popupWindow.close()
          clearTimeout(this.timeoutCheckUser)
        }
        this.profile = {
          ...profile,
          ...user.data
        }
        this.$overlay.hide()
      } else {
        this.timeoutCheckUser = setTimeout(() => {
          this.checkTimeout++
          this.getLineProfile(false)
        }, 5000)
        if (redirect) {
          const authen = await this.$axios.$get(`${process.env.apiUrl}${process.env.oAuthAuthorize}?page=${this.$route.path.replace('/liff/', '')}`)
          this.popupWindow = window.open(authen.data)
          // window.location = authen.data
        }
      }
    },
    close () {
      liff.closeWindow()
    }
  }
}
</script>
