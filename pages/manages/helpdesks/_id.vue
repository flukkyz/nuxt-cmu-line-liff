<template>
  <div v-if="data" class="my-5">
    <v-list color="grey lighten-4 mb-3">
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
      <v-card class="grey lighten-4 mt-2 mb-3" elevation="0">
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
        v-if="data.admin_reply"
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
    <div v-else-if="data.mode === 'start'" class="chat">
      <div class="chat-list">
        <div v-for="msg in data.message" :key="`msg-${msg._id}`">
          <div class="d-flex">
            <v-card :id="`msg-list-${msg._id}`" class="grey lighten-4 mb-3 rounded" max-width="70%" :class="msg.is_admin ? 'ml-auto' : ''" elevation="0">
              <v-card-title class="pb-0" :class="msg.is_admin ? 'text-right' : ''">
                {{ msg.is_admin ? `Admin: ${$auth.user.firstname} ${$auth.user.lastname}` : `${data.user_detail[0].firstname} ${data.user_detail[0].lastname}` }}
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
      <v-form ref="form" v-model="valid" @submit.prevent="sendChat">
        <v-row>
          <v-col>
            <v-textarea
              v-model="msgBox"
              autocomplete="off"
              autofocus
              rows="3"
              flat
              outlined
              @keypress.enter="sendChat"
              @keyup="msgBox = msgBox.trim()"
            />
          </v-col>
          <v-col cols="3">
            <v-btn
              color="primary"
              x-large
              block
              depressed
              type="submit"
              :disabled="!msgBox || sending"
              :loading="sending"
            >
              <v-icon small left>
                fas fa-paper-plane
              </v-icon>
              ส่ง
            </v-btn>
            <v-btn
              outlined
              color="red"
              class="mt-4"
              block
              :loading="sending"
            >
              <v-icon small left>
                fas fa-door-open
              </v-icon>
              จบการสนทนา
            </v-btn>
          </v-col>
        </v-row>
        <dialogs-confirm @confirm="confirmSave" />
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      api: `${process.env.apiUrl}${process.env.apiDirectory}helpdesks`,
      categories: null,
      data: null,
      msgBox: '',
      sending: false
    }
  },
  async mounted () {
    try {
      const categories = await this.$axios.$get(`${process.env.apiUrl}${process.env.apiDirectory}categories`)
      this.categories = categories.data
      await this.fetchData()
      if (this.data.mode === 'start') {
        this.$vuetify.goTo(`#msg-list-${this.data.message.lastItem._id}`, {
          duration: 0,
          container: '.chat-list'
        })
        setInterval(async () => {
          await this.fetchData()
        }, 2000)
      }
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
        this.$vuetify.goTo(`#msg-list-${this.data.message.lastItem._id}`, {
          duration: 0,
          container: '.chat-list'
        })
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
    },
    async sendChat () {
      const massage = this.msgBox
      this.sending = true
      this.msgBox = ''
      try {
        await this.$axios.$put(`${this.api}/message/${this.$route.params.id}`, {
          content: massage
        })
        const formData = new FormData()
        formData.append('txt', massage)
        formData.append('send_type', 'select')
        formData.append('users', [this.data.user_detail[0].lineid])
        formData.append('announce_img', null)
        await this.$axios.$post(`${process.env.baseUrl}/api/announce`, formData)
        await this.fetchData()
        this.$vuetify.goTo(`#msg-list-${this.data.message.lastItem._id}`, {
          duration: 0,
          container: '.chat-list'
        })
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
      this.sending = false
    }
  }
}
</script>

<style lang="scss" scoped>
.chat-list{
  height: 60vh;
  overflow: scroll;
}
textarea {
  resize: none;
}
</style>
