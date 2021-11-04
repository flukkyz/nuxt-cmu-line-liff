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
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
  }
}
</script>
