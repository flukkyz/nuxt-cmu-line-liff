<template>
  <div>
    <v-btn @click="logout">
      Log out
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    logout () {
      liff.logout()
    }
  }
}
</script>
