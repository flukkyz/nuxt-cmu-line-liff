<template>
  <div class="pt-16">
    <v-row justify="center" class="mt-16">
      <v-col cols="8">
        <v-progress-linear
          color="deep-purple accent-4"
          indeterminate
          rounded
          height="6"
        />
      </v-col>
    </v-row>
    <h1 class="display-1 text-center teal--text mt-5">
      Waiting for Authentication
    </h1>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
  validate ({ query }) {
    return query.code && query.state
  },
  head () {
    return {
      title: 'Authentication'
    }
  },
  created () {
    // this.$breadcrumbs.clear()
    this.$store.commit('setPendingLogin', true)
  },
  mounted () {
    if (this.$route.query.state && this.$route.query.state === 'admin') {
      console.log('admin')
    } else {
      liff.init({
        liffId: '1656332858-DgV6jA5l'
      }).then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then(async (profile) => {
            this.profile = profile
            const url = `https://mis-api.cmu.ac.th/mis/lineapp/api/token/${this.$route.query.code}/${profile.userId}`
            await this.$axios.$get(url)
            this.$router.push({ name: `liff-${this.$route.query.state}` })
          })
        } else {
          liff.login()
        }
      })
    }
  }
}
</script>
