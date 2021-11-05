<template>
  <div>
    <!-- <v-list>
      <v-list-item>
        <v-list-item-icon>
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                large
                :color=" item.admin_reply ? 'primary' : 'success'"
                v-on="on"
              >
                {{ item.admin_reply ? `${item.mode === 'start' ? 'fas' : 'far'} fa-comments` : `${item.mode === 'read' ? 'fas' : 'far'} fa-comment-alt` }}
              </v-icon>
            </template>
            <span>{{ item.admin_reply ? 'ต้องการให้ตอบกลับ' : 'ข้อเสนอแนะ' }}</span>
          </v-tooltip>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="title">
            <v-badge v-if="item.mode === 'wait'" dot color="warning">
              {{ `${item.user_detail[0].firstname} ${item.user_detail[0].lastname}` }}
            </v-badge>
            <span v-else>
              {{ `${item.user_detail[0].firstname} ${item.user_detail[0].lastname}` }}
            </span>
          </v-list-item-title>
          <v-list-item-subtitle class="mt-1">
            <v-icon x-small>
              fas fa-sitemap
            </v-icon>
            {{ item.user_detail[0].organizationname }}
                    &nbsp;
            <v-icon x-small>
              far fa-envelope
            </v-icon>
            {{ item.user_detail[0].email }}
          </v-list-item-subtitle>
          <v-list-item-subtitle class="info--text mt-3 caption">
            {{ item.message[0].content.length > 100 ? `${item.message[0].content.substring(0, 100)}...` : item.message[0].content }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="align-self-start">
          <p class="grey--text caption mb-0">
            {{ $dateText(item.createdAt,'medium','long') }}
          </p>
        </v-list-item-action>
      </v-list-item>
    </v-list> -->

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
      console.log(this.data)
      await this.$axios.$put(`${this.api}/mode/${this.$route.params.id}`, {
        mode: 'wait',
        category_id: '6183732a6f433335811186c3'
      })
      // await this.$axios.$put(`${this.api}/message/${this.$route.params.id}`, {
      //   content: 'start start start start start start start start start start start start start start '
      // })
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
  }
}
</script>
