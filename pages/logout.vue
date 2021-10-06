<template>
  <div>
    <v-btn @click="logout">
      Log out
    </v-btn>
  </div>
</template>

<script>
export default {
  mounted () {
    liff.init({
      liffId: '1656332858-DgV6jA5l'
    })
  },
  methods: {
    logout () {
      liff.logout()
    }
  }
}
</script>
