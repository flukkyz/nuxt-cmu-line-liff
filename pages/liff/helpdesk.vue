<template>
  <v-form ref="form" v-model="valid" @submit.prevent="save">
    <v-container fluid>
      <h3 class="text-center teal--text fonr-weight-light">
        แจ้งปัญหาการใช้งาน
      </h3>
      <v-row>
        <v-col>
          <v-textarea
            v-model="form.content"
            autocomplete="off"
            autofocus
            outlined
            hint="กรอกข้อความปัญหาการใช้งาน"
            :rules="rules.content"
            required
          />
          <v-checkbox
            v-model="form.admin_reply"
            label="ต้องการให้เจ้าหน้าที่ตอบกลับ"
          />
          <v-btn color="primary" x-large block type="submit" :disabled="oneClick">
            ส่ง
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
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
      }
    }
  },
  created () {
    this.$overlay.showLoading()
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
    async getLineProfile () {
      const profile = await liff.getProfile()
      const urlCheckIsUser = `${process.env.apiUrl}${process.env.apiDirectory}users/lineid/${profile.userId}`
      const user = await this.$axios.$get(urlCheckIsUser)
      this.datas = user
      if (user.status === 'ok') {
        this.profile = {
          ...profile,
          ...user.data
        }
        this.$overlay.hide()
      } else {
        const authen = await this.$axios.$get(`${process.env.apiUrl}${process.env.oAuthAuthorize}?page=${this.$route.name}`)
        window.location = authen.data
      }
    },
    save () {
      if (this.$refs.form.validate()) {
        this.$overlay.showLoading()
        this.oneClick = true
        alert(this.form.content)
        liff.closeWindow()
      }
    }
  }
}
</script>
