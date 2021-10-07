<template>
  <div v-if="profile" class="text-center">
    <v-img :src="profile.pictureUrl" contain />
    <p class="caption teal--text mt-2">
      {{ profile.displayName }}
    </p>
    <p class="title">
      {{ `${profile.firstname} ${profile.lastname}` }}
    </p>
    <p class="subtitle-1">
      <v-icon small>
        fas fa-briefcase
      </v-icon>
      {{ `${profile.organizationname}` }}
    </p>
    <p class="subtitle-1">
      <v-icon small>
        fas fa-envelope
      </v-icon>
      {{ `${profile.email}` }}
    </p>

    <pre>
      {{ profile }}
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
        })
      } else {
        liff.login({ redirectUri: window.location.href })
      }
    })
  }
}
</script>
