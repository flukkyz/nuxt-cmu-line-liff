<template>
  <v-form ref="form" v-model="valid" @submit.prevent="save">
    <v-container fluid>
      <h3 class="text-center teal--text fonr-weight-light my-5">
        แจ้งปัญหาการใช้งาน
      </h3>
      <v-row>
        <v-col>
          <v-textarea
            v-model="form.content"
            autocomplete="off"
            autofocus
            rows="10"
            filled
            flat
            shaped
            hint="กรอกข้อความปัญหาการใช้งาน"
            :rules="rules.content"
            required
          />
          <v-checkbox
            v-model="form.admin_reply"
            label="ต้องการให้เจ้าหน้าที่ตอบกลับ"
          />
          <v-btn color="primary" x-large block type="submit" :disabled="oneClick">
            แจ้งปัญหา
          </v-btn>
        </v-col>
      </v-row>
      <div class="mt-10 mb-3 text-center">
        <v-btn outlined @click="close">
          ปิด
        </v-btn>
      </div>
    </v-container>
    <dialogs-confirm @confirm="confirmSave" />
  </v-form>
</template>

<script>
export default {
  layout: 'empty',
  data () {
    return {
      profile: null,
      valid: true,
      oneClick: false,
      rules: {
        content: [
          v => !!v || 'กรุณากรอกกรอกข้อความปัญหาการใช้งาน'
        ]
      },
      form: {
        content: '',
        admin_reply: false
      },
      timeoutCheckUser: null,
      popupWindow: ''
    }
  },
  created () {
    this.$overlay.showLoading()
  },
  beforeDestroy () {
    this.timeoutCheckUser && clearTimeout(this.timeoutCheckUser)
  },
  async beforeMount () {
    await liff.init({ liffId: process.env.liffID })
    if (liff.isInClient()) {
      this.getLineProfile()
    } else if (liff.isLoggedIn()) {
      this.getLineProfile()
    } else {
      liff.login({ redirectUri: window.location.href })
    }
  },
  methods: {
    async getLineProfile (redirect = true) {
      const profile = await liff.getProfile()
      const urlCheckIsUser = `${process.env.apiUrl}${process.env.apiDirectory}users/lineid/${profile.userId}`
      const user = await this.$axios.$get(urlCheckIsUser)
      if (user.status === 'ok') {
        if (this.timeoutCheckUser) {
          clearTimeout(this.timeoutCheckUser)
        }
        if (this.popupWindow) {
          await this.popupWindow.close()
        }
        this.profile = {
          ...profile,
          ...user.data
        }
        const chatStatusData = await this.$axios.$get(`${process.env.apiUrl}${process.env.apiDirectory}line/users/chat`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.profile.userId}`
          }
        })
        if (chatStatusData.chat) {
          const formData = new FormData()
          formData.append('txt', 'คุณกำลังอยู่ในโหมดสนทนา สามารถสนทนาผ่านทางช่องแชทของ Line ได้โดยกดปุ่มไอคอนรูปแป้นพิมพ์ด้านล่างซ้ายเพื่อเปลี่ยนไปใช้แป้นพิมพ์ในการสนทนา')
          formData.append('send_type', 'select')
          formData.append('users', [this.profile.userId])
          formData.append('announce_img', null)
          try {
            await this.$axios.$post(`${process.env.baseUrl}/api/announce`, formData)
            this.close()
          } catch (e) {
            this.$notifier.showMessage({ title: 'Error', content: e, color: 'error' })
          }
        }
        this.$overlay.hide()
      } else {
        this.timeoutCheckUser = setTimeout(() => {
          this.getLineProfile(false)
        }, 3000)
        if (redirect) {
          const authen = await this.$axios.$get(`${process.env.apiUrl}${process.env.oAuthAuthorize}?page=${this.$route.path.replace('/liff/', '')}`)
          this.popupWindow = window.open(authen.data, '_self')
        }
      }
    },
    save () {
      if (this.$refs.form.validate()) {
        this.$bus.$emit('open-confirm-dialog', null, {
          header: {
            icon: 'fas fa-question-circle',
            text: 'ยืนยันการแจ้งปัญหา'
          },
          detail: {
            text: 'ยืนยันความถูกต้องของข้อความที่ต้องการแจ้งปัญหา'
          },
          yesBtn: {
            icon: 'fas fa-paper-plane',
            color: 'primary',
            text: 'แจ้งปัญหา'
          },
          noBtn: {
            icon: 'fas fa-times',
            color: 'error',
            text: 'ยกเลิก'
          }
        })
      }
    },
    async confirmSave () {
      this.$overlay.showLoading()
      this.oneClick = true
      const send = await this.$axios.$post(`${process.env.apiUrl}${process.env.apiDirectory}line/helpdesks`, this.form, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.profile.userId}`
        }
      })
      this.$store.commit('socket/send', {
        id: send.data.helpdesk._id,
        type: 'action',
        message: 'wait'
      })
      console.log('send', send)
      console.log('send.data', send.data)
      console.log('send.data._id', send.data._id)
      console.log([this.profile.userId])
      console.log([...send.data.admin])
      await this.pushMessage([this.profile.userId], `เราได้รับข้อความการแจ้งปัญหาการใช้งานของคุณแล้ว ${this.form.admin_reply ? 'เจ้าหน้าที่จะตอบกลับโดยเร็วที่สุด' : ''} ขอบคุณครับ`)
      await this.pushMessage(send.data.admin, `มีข้อความการแจ้งปัญหาการใช้งานใหม่${this.form.admin_reply ? '(ต้องการให้ตอบกลับ)' : ''}`)
      if (send.data.notification > 1) {
        await this.pushMessage(send.data.admin, `มีการแจ้งปัญหาการใช้งานที่ยังไม่ได้อ่านรวม ${send.data.notification} รายการ`)
      }
      this.close()
    },
    async pushMessage (to, message) {
      const formData = new FormData()
      formData.append('txt', message)
      formData.append('send_type', 'select')
      formData.append('users', to)
      formData.append('announce_img', null)
      try {
        await this.$axios.$post(`${process.env.baseUrl}/api/announce`, formData)
      } catch (e) {
        this.$notifier.showMessage({ title: 'Error', content: e, color: 'error' })
      }
    },
    close () {
      liff.closeWindow()
    }
  }
}
</script>
