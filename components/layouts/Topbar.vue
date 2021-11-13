<template>
  <div>
    <v-app-bar
      v-if="$auth.loggedIn"
      app
      color="white"
      elevation="0"
    >
      <v-app-bar-nav-icon v-if="$auth.loggedIn" @click.stop="toggleDrawer" />
      <v-spacer />
      <v-toolbar-title>
        <div class="d-flex align-center">
          <img src="/images/logo.png" width="30">
          <span class="mb-0 mt-2 ml-1">
            CMU Line Management
          </span>
        </div>
      </v-toolbar-title>
      <v-spacer />

      <template v-if="$store.state.pending_login">
        <v-progress-circular
          class="mt-0 mr-2"
          :size="14"
          :width="3"
          indeterminate
          color="white"
        />
        <p class="mr-3 mt-3 body-1">
          Loading...
        </p>
      </template>
      <template v-else>
        <template v-if="$auth.loggedIn">
          <v-badge
            :content="noti"
            :value="noti"
            class="mr-5"
            color="warning"
            overlap
          >
            <nuxt-link :to="localePath({name: 'manages-helpdesks'})">
              <v-icon>
                fas fa-bell
              </v-icon>
            </nuxt-link>
          </v-badge>
          <v-btn text class="py-6 d-none d-md-flex" @click.stop="logout">
            <v-icon left>
              fas fa-sign-out-alt
            </v-icon>
            {{ $t('LOGOUT') }}
            {{ noti }}
          </v-btn>
          <v-btn text class="py-6 d-flex d-md-none" @click.stop="logout">
            <v-icon small>
              fas fa-sign-out-alt
            </v-icon>
          </v-btn>
        </template>
        <v-btn v-else-if="$route.name && ($route.name && $route.name.substr(0, 5) !== 'login')" text :to="localePath({name: 'login'})">
          <v-icon left>
            fas fa-sign-in-alt
          </v-icon>
          {{ $t('LOGIN') }}
        </v-btn>
      </template>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      noti: 0,
      subscribe: null
    }
  },
  computed: {
    iconName () {
      return this.$auth.loggedIn ? this.$auth.user.firstname_EN.replaceAll(/เ|แ|โ|ไ|ใ/g, '').substring(0, 1) + this.$auth.user.lastname_EN.replaceAll(/เ|แ|โ|ไ|ใ/g, '').substring(0, 1) : ''
    }
  },
  created () {
    this.subscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'socket/receive') {
        if (state.socket.dataReceive.type === 'notification') {
          console.log('RECEIVE NOTI', state.socket.dataReceive)
          this.noti = state.socket.dataReceive.message
        }
      }
    })
  },
  beforeDestroy () {
    this.subscribe()
  },
  async beforeMount () {
    try {
      const noti = await this.$axios.$get(`${process.env.apiUrl}${process.env.apiDirectory}helpdesks/status/wait`)
      this.noti = noti.data
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
  },
  methods: {
    toggleDrawer () {
      this.$store.commit('setDrawer', !this.$store.state.drawer)
    },
    toggleDarkMode () {
      this.$store.commit('setDarkMode', !this.$store.state.dark_mode)
      this.$vuetify.theme.dark = this.$store.state.dark_mode
    },
    logout () {
      this.$router.push(this.localePath({ name: 'logout' }))
    }
  }
}
</script>

<style lang="scss" scoped>
header.v-sheet{
  border-bottom:  4px solid #007bff !important;
}
</style>
