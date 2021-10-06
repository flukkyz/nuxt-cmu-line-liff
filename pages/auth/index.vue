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
    <p>Q</p>
    <pre v-if="$route.query">
      {{ $route.query }}
    </pre>
    <h1 class="display-2 text-center teal--text mt-5">
      Waiting for Authentication
    </h1>
    <p>
      call API : {{ callApi ? 'T' : 'F' }}
    </p>
    <pre v-if="datas">
      {{ datas }}
    </pre>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
  validate ({ query }) {
    return query.code && query.state
  },
  data () {
    return {
      callApi: false,
      datas: null
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
  mounted () {
    liff.init({
      liffId: '1656332858-DgV6jA5l'
    }).then(() => {
      if (liff.isLoggedIn()) {
        liff.getProfile().then(async (profile) => {
          this.profile = profile
          const url = `https://mis-api.cmu.ac.th/mis/lineapp/api/token/${this.$route.query.code}/${profile.userId}`
          const acc = await this.$axios.$get(url)
          this.callApi = true
          this.datas = acc
          this.$router.push({ name: this.$route.query.state })
        })
      } else {
        liff.login()
      }
    })
  }
}
</script>
