<template>
  <div>
    helpdesks
    {{ data }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      api: `${process.env.apiUrl}${process.env.apiDirectory}helpdesks`,
      data: null
    }
  },
  async mounted () {
    try {
      const data = await this.$axios.$get(`${this.api}/${this.$route.params.id}`)
      this.data = data.data
      await this.$axios.$put(`${this.api}/status/${this.$route.params.id}`, {
        mode: 'read'
      })
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
  }
}
</script>
