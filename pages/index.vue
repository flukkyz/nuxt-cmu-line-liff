<template>
  <div class="d-flex h-100 fill">
    <v-img src="/images/logo.png" contain max-width="250" class="my-auto mx-auto" />
  </div>
</template>

<script>
export default {
  layout: 'empty',
  mounted () {
    setTimeout(async () => {
      await this.$axios.$post(`${process.env.baseUrl}/api/webhook`,{
        data: 'test'
      }, {
        headers: {
          Authorization: 'Bearer i6DNvKSVEeXmQC+IAdPqghQwxqmBj0ZTvTZLTf5Vk2A2GVxHZXrdFjk/8A7uE4aamuIc8hFOgUdPG+zDyGy+56cp6J9tYIIKyRDUPs3aR/4ttoyzahApREp03DQXjFhAxHAycFB8EFnVcq9LGuhaagdB04t89/1O/w1cDnyilFU='
        }
      })
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.fill{
  min-height: 100vh;
}
</style>
