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
</template>

<script>
export default {
  layout: 'empty',
  data () {
    return {
      profile: null
    }
  },
  async beforeMount () {
    await liff.init({ liffId: '1656332858-DgV6jA5l' })
    if (liff.isInClient()) {
      this.getLineProfile()
    } else if (liff.isLoggedIn()) {
      this.getLineProfile()
    } else {
      liff.login({ redirectUri: window.location.href })
    }
  },
  methods: {
    async getLineProfile () {
      const profile = await liff.getProfile()
      const urlCheckIsUser = `https://mis-api.cmu.ac.th/mis/lineapp/api/users/${profile.userId}`
      const user = await this.$axios.$get(urlCheckIsUser)
      this.datas = user
      if (user.status === 'ok') {
        this.profile = {
          ...profile,
          ...user.data
        }
      } else {
        const authen = await this.$axios.$get('https://mis-api.cmu.ac.th/mis/lineapp/authorize?page=profile')
        this.authen = authen
        window.location = authen.data
      }
    },
    close () {
      liff.closeWindow()
    }
  }
}
</script>
