<template>
  <div v-if="data" class="mt-10 mb-5">
    <v-list color="grey lighten-4 mb-5">
      <v-list-item>
        <v-list-item-icon>
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                large
                :color=" data.admin_reply ? 'primary' : 'success'"
                v-on="on"
              >
                {{ data.admin_reply ? `${data.mode === 'start' ? 'fas' : 'far'} fa-comments` : `${data.mode === 'read' ? 'fas' : 'far'} fa-comment-alt` }}
              </v-icon>
            </template>
            <span>{{ data.admin_reply ? 'ต้องการให้ตอบกลับ' : 'ข้อเสนอแนะ' }}</span>
          </v-tooltip>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="title">
            <v-badge v-if="data.mode === 'wait'" dot color="warning">
              {{ `${data.user_detail[0].firstname} ${data.user_detail[0].lastname}` }}
            </v-badge>
            <span v-else>
              {{ `${data.user_detail[0].firstname} ${data.user_detail[0].lastname}` }}
            </span>
          </v-list-item-title>
          <v-list-item-subtitle class="mt-1">
            <v-icon x-small>
              fas fa-sitemap
            </v-icon>
            {{ data.user_detail[0].organizationname }}
                    &nbsp;
            <v-icon x-small>
              far fa-envelope
            </v-icon>
            {{ data.user_detail[0].email }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="align-self-start">
          <p class="grey--text caption mb-0">
            {{ $dateText(data.createdAt,'medium','long') }}
          </p>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <div v-if="['wait','read'].includes(data.mode)" class="">
      <v-card class="grey lighten-4 mb-3" elevation="0">
        <v-card-text>
          <v-card-subtitle>
            {{ data.message[0].content }}
          </v-card-subtitle>
        </v-card-text>
      </v-card>

      <label for="">ประเภทปัญหาที่แจ้ง</label>
      ประเภทปัญหาที่แจ้ง
      <v-radio-group row class="mt-0" hide-details @change="setCategory">
        <v-radio
          v-for="category in categories"
          :key="`category-${category._id}`"
          :label="category.name"
          :value="category._id"
        />
      </v-radio-group>

      <v-btn
        x-large
        elevation="0"
        class="mt-10"
        depressed
        color="success"
        @click="openChat"
      >
        เปิดการสนทนา
      </v-btn>
    </div>
    <div v-else-if="data.mode === 'start'" class="">
      <div v-for="msg in data.message" :key="`msg-${msg._id}`">
        <div class="d-flex">
          <v-card class="grey lighten-4 mb-3 rounded" max-width="70%" :class="msg.is_admin ? 'ml-auto' : ''" elevation="0">
            <v-card-title class="pb-0" :class="msg.is_admin ? 'text-right' : ''">
              {{ `${data.user_detail[0].firstname} ${data.user_detail[0].lastname}` }}
            </v-card-title>
            <v-card-text class="pa-2">
              <v-card-subtitle class="pt-0">
                {{ msg.content }}
              </v-card-subtitle>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>

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
      categories: null,
      data: null
    }
  },
  async mounted () {
    try {
      const categories = await this.$axios.$get(`${process.env.apiUrl}${process.env.apiDirectory}categories`)
      this.categories = categories.data
      await this.fetchData()
      await this.$axios.$put(`${this.api}/mode/${this.$route.params.id}`, {
        mode: 'wait'
      })
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
  },
  methods: {
    async fetchData () {
      try {
        const data = await this.$axios.$get(`${this.api}/${this.$route.params.id}`)
        this.data = data.data[0]
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
    },
    async setCategory (val) {
      try {
        await this.$axios.$put(`${this.api}/mode/${this.$route.params.id}`, {
          mode: 'read',
          category_id: val
        })
        await this.fetchData()
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
    },
    async openChat () {
      try {
        await this.$axios.$put(`${this.api}/mode/${this.$route.params.id}`, {
          mode: 'start'
        })
        await this.fetchData()
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
    }
  }
}
</script>
