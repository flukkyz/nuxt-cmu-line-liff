<template>
  <div class="d-flex h-100 fill">
    <v-img src="/images/logo.png" contain max-width="250" class="my-auto mx-auto" />
  </div>
</template>

<script>
export default {
  layout: 'empty',
  beforeMount () {
    liff.init({ liffId: process.env.liffID })
  }

}
</script>

<style lang="scss" scoped>
.fill{
  min-height: 100vh;
}
</style>
