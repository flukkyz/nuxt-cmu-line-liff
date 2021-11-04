<template>
  <div>
    helpdesks
    <pre>

    {{ data }}
    </pre>
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
      await this.$axios.$put(`${this.api}/mode/${this.$route.params.id}`, {
        mode: 'start',
        category_id: '6183732a6f433335811186c3'
      })
      await this.$axios.$put(`${this.api}/message/${this.$route.params.id}`, {
        content: 'start start start start start start start start start start start start start start '
      })
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
  }
}
</script>
