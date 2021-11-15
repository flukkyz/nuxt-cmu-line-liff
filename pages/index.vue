<template>
  <div class="d-flex h-100 fill">
    <v-img src="/images/logo.png" contain max-width="250" class="my-auto mx-auto" />
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  mounted () {
    setTimeout(() => {
      this.$router.push(this.localePath({ name: 'manages-helpdesks' }))
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.fill{
  min-height: 100vh;
}
</style>
