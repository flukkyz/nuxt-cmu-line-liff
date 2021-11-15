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
        <v-list-item-action class="align-self-end">
          <p v-if="data.category_detail && data.category_detail.length > 0" class="mb-0">
            <span class="info--text caption font-weigth-bold">
              ประเภทปัญหาที่แจ้ง
            </span>
            {{ data.category_detail[0].name }}
          </p>
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
    </div>

    <label for="">ประเภทปัญหาที่แจ้ง</label>
    <v-radio-group
      v-model="categoryRadio"
      row
      class="mt-0 mb-3"
      hide-details
      @change="setCategory"
    >
      <v-radio
        v-for="category in categories"
        :key="`category-${category._id}`"
        :label="category.name"
        :value="category._id"
      />
    </v-radio-group>
    <div v-if="['wait','read'].includes(data.mode)" class="mt-10">
      <v-btn
        v-if="data.admin_reply"
        x-large
        elevation="0"
        class="mr-3"
        depressed
        :disabled="!data.category_detail || (data.category_detail && data.category_detail.length === 0)"
        color="success"
        @click="openChat"
      >
        เปิดการสนทนา
      </v-btn>
      <v-btn
        outlined
        color="red"
        block
        :disabled="!data.category_detail || (data.category_detail && data.category_detail.length === 0)"
        @click="cancelChat"
      >
        <v-icon small left>
          fas fa-comment-slash
        </v-icon>
        ละทิ้งการสนทนานี้
      </v-btn>
    </div>
    <div v-else-if="['start','leave'].includes(data.mode)" class="chat grey lighten-5">
      <div class="chat-list pa-3">
        <div v-for="(msg,i) in msgLists" :key="`msg-${i}`">
          <div class="d-flex">
            <v-card :id="`msg-list-${i}`" class="mb-3 rounded" max-width="70%" :class="msg.is_admin ? 'ml-auto primary lighten-4' : 'success lighten-4'" elevation="0">
              <v-card-title v-if="!msg.is_admin" class="pb-0 body-1 font-weight-bold">
                {{ msg.is_admin ? `Admin: ${$auth.user.firstname} ${$auth.user.lastname}` : `${data.user_detail[0].firstname} ${data.user_detail[0].lastname}` }}
              </v-card-title>
              <v-card-text class="pa-2">
                <v-card-subtitle :class="msg.is_admin ? 'py-2' : 'pt-0 pb-2'">
                  {{ msg.content }}
                </v-card-subtitle>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </div>
      <v-form v-if="data.mode === 'start' && data.admin_id === $auth.user._id" ref="form" v-model="valid" @submit.prevent="sendChat">
        <v-row class="px-3">
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
              :disabled="!msgBox"
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
              @click="leaveChat"
            >
              <v-icon small left>
                fas fa-door-open
              </v-icon>
              จบการสนทนา
            </v-btn>
          </v-col>
        </v-row>
        <dialogs-confirm value="leave" @confirm="confirmLeaveChat" />
        <dialogs-confirm value="cancel" @confirm="confirmCancelChat" />
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
      categoryRadio: null,
      data: null,
      msgLists: [],
      subscribe: null,
      msgBox: '',
      // sending: false,
      lastMsgListId: null
    }
  },
  created () {
    this.subscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'socket/receive') {
        if (state.socket.dataReceive.type === 'text') {
          console.log('RECEIVE', state.socket.dataReceive)
          this.msgLists.push({
            is_admin: false,
            content: state.socket.dataReceive.message
          })
          this.refershChat()
        }
      }
    })
  },
  beforeDestroy () {
    this.subscribe()
  },
  async mounted () {
    try {
      const categories = await this.$axios.$get(`${process.env.apiUrl}${process.env.apiDirectory}categories`)
      this.categories = categories.data
      await this.fetchData()
      this.msgLists = [...this.data.message]
      if (this.data.mode === 'start') {
        await this.startChat()
      }
    } catch (e) {
      console.log(e)
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
  },
  methods: {
    async fetchData () {
      try {
        const data = await this.$axios.$get(`${this.api}/${this.$route.params.id}`)
        this.data = data.data[0]
        console.log(this.data)
        if (this.data.category_detail && this.data.category_detail.length > 0) {
          this.categoryRadio = this.data.category_detail[0]._id
          console.log(this.categoryRadio)
        }
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
    },
    async setCategory (val) {
      try {
        await this.$axios.$put(`${this.api}/mode/${this.$route.params.id}`, {
          mode: (this.data.mode === 'wait' ? 'read' : this.data.mode),
          category_id: val
        })
        this.$store.commit('socket/send', {
          id: '',
          type: 'action',
          message: 'admin'
        })
        await this.fetchData()
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
    },
    async openChat () {
      if (this.data.admin_id === this.$auth.user._id) {
        try {
          await this.$axios.$put(`${this.api}/mode/${this.$route.params.id}`, {
            mode: 'start'
          })
          await this.fetchData()
          this.msgLists = [...this.data.message]
          this.startChat()
          await this.pushMessageBack(`เปิดการสนทนา\n\nเรื่อง "${this.data.message[0].content}" \n\nกดปุ่มไอคอนรูปแป้นพิมพ์ด้านล่างซ้ายเพื่อเปลี่ยนไปใช้แป้นพิมพ์ในการสนทนา`)
        } catch (e) {
          this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
        }
      }
    },
    startChat () {
      this.$store.commit('socket/send', {
        id: this.data._id,
        type: 'action',
        message: 'admin'
      })
      this.refershChat(0)
    },
    refershChat (duration = 200) {
      if (this.msgLists.length - 1 !== this.lastMsgListId) {
        this.lastMsgListId = this.msgLists.length - 1
        setTimeout(() => {
          console.log('GO TO', `#msg-list-${this.msgLists.length - 1}`)
          this.$vuetify.goTo(`#msg-list-${this.msgLists.length - 1}`, {
            duration,
            container: '.chat-list'
          })
        }, 10)
      }
    },
    async sendChat () {
      this.msgLists.push({
        is_admin: true,
        content: this.msgBox
      })
      this.refershChat()
      const massage = this.msgBox
      // this.sending = true
      this.msgBox = ''
      try {
        await this.$axios.$put(`${this.api}/message/${this.$route.params.id}`, {
          content: massage
        })
        await this.pushMessageBack(massage)
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
      // this.sending = false
    },
    async pushMessageBack (message) {
      const formData = new FormData()
      formData.append('txt', message)
      formData.append('send_type', 'select')
      formData.append('users', [this.data.user_detail[0].lineid])
      formData.append('announce_img', null)
      await this.$axios.$post(`${process.env.baseUrl}/api/announce`, formData)
    },
    leaveChat () {
      this.$bus.$emit('open-confirm-dialog-leave', null, {
        header: {
          icon: 'fas fa-question-circle',
          text: 'ออกจากการสนทนา'
        },
        detail: {
          text: `ยืนยันการออกจากการสนทนากับ ${this.data.user_detail[0].firstname} ${this.data.user_detail[0].lastname}`
        },
        yesBtn: {
          icon: 'fas fa-door-open',
          color: 'red',
          text: 'ออกจากการสนทนา'
        },
        noBtn: {
          icon: 'fas fa-comments',
          color: 'info',
          text: 'สนทนาต่อ'
        }
      })
    },
    cancelChat () {
      this.$bus.$emit('open-confirm-dialog-cancel', null, {
        header: {
          icon: 'fas fa-question-circle',
          text: 'ละทิ้งการสนทนานี้'
        },
        detail: {
          text: `ยืนยันการละทิ้งการสนทนากับ ${this.data.user_detail[0].firstname} ${this.data.user_detail[0].lastname}`
        },
        yesBtn: {
          icon: 'fas fa-comment-slash',
          color: 'red',
          text: 'ละทิ้งการสนทนา'
        },
        noBtn: {
          icon: 'fas fa-ban',
          color: 'info',
          text: 'ยกเลิก'
        }
      })
    },
    async confirmLeaveChat () {
      this.$store.commit('socket/send', {
        id: this.data._id,
        type: 'action',
        message: 'leave'
      })
      try {
        await this.$axios.$put(`${this.api}/mode/${this.$route.params.id}`, {
          mode: 'leave'
        })
        await this.fetchData()
        await this.pushMessageBack('ปิดการสนทนา ขอบคุณสำหรับคำแนะนำในการใช้งาน')
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
      this.$overlay.hide()
    },
    async confirmCancelChat () {
      try {
        await this.$axios.$put(`${this.api}/mode/${this.$route.params.id}`, {
          mode: 'leave'
        })
        await this.fetchData()
      } catch (e) {
        this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
      }
      this.$overlay.hide()
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
