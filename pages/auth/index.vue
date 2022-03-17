<template>
  <div class="pt-16">
    <div v-if="register">
      <h1 class="display-1 text-center teal--text mt-5">
        ลงทะเบียนสำเร็จ
      </h1>
    </div>
    <div v-else>
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
  </div>
</template>

<script>
export default {
  layout: 'empty',
  middleware: 'guest',
  validate ({ query }) {
    return query.code && query.state
  },
  data () {
    return {
      register: false,
      timeoutRedirect: null
    }
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
  beforeDestroy () {
    this.timeoutRedirect && clearTimeout(this.timeoutRedirect)
  },
  async beforeMount () {
    if (this.$route.query.state && this.$route.query.state === 'admin') {
      const timeOfTimeout = 20
      const timeout = setTimeout(() => {
        this.$store.commit('setPendingLogin', false)
        this.$nuxt.error({ statusCode: 401, message: 'Unauthorized' })
      }, timeOfTimeout * 1000)
      const acc = await this.$axios.$get(`${process.env.apiUrl}${process.env.apiDirectory}token/${this.$route.query.code}`)
      this.$auth.setUserToken(acc.access_token, '1234567').then(async () => {
        const user = await this.$auth.fetchUser()
        if (user) {
          clearTimeout(timeout)
        }
        this.$store.commit('setPendingLogin', false)
        // this.$bus.$emit('reset-side-menu')
      })
    } else {
      liff.init({ liffId: process.env.liffID }).then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then(async (profile) => {
            this.profile = profile
            const url = `${process.env.apiUrl}${process.env.apiDirectory}token/${this.$route.query.code}?lineid=${profile.userId}`
            await this.$axios.$get(url)
            this.register = true
            this.timeoutRedirect = setTimeout(() => {
              window.location = `https://liff.line.me/${process.env.liffID}/${this.$route.query.state}`
            }, 3000)
          })
        } else {
          liff.login()
        }
      })
    }
  }
}
</script>
