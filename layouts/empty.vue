<template>
  <v-app dark>
    <v-main>
      <v-container class="py-0 my-0">
        <nuxt />
      </v-container>
    </v-main>
    <snackbar />
    <overlay />
    <b-t-t />
  </v-app>
</template>

<script>
export default {
  name: 'Empty'
}
</script>
