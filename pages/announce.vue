<template>
  <div class="my-10">
    <v-card color="basil" elevation="0">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="display-1 basil--text">
          <span class="fas fa-bullhorn text-center" />
          ประกาศ
        </h1>
      </v-card-title>

      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="basil"
        grow
      >
        <v-tab>
          <v-icon left>
            fas fa-font
          </v-icon>
          ข้อความ
        </v-tab>
        <v-tab>
          <v-icon left>
            fas fa-image
          </v-icon>
          รูปภาพ
        </v-tab>
      </v-tabs>

      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="send">
          <v-textarea
            v-if="tab === 0"
            v-model="form.txt"
            label="ข้อความที่ประกาศ"
            autocomplete="off"
            autofocus
            outlined
            :rules="rules.text"
            required
          />
          <img-input
            v-else
            v-model="form.img"
            label="รูปภาพ"
            :rules="rules.image"
          />

          <v-btn
            color="success"
            x-large
            depressed
            block
            type="submit"
            :disabled="oneClick"
          >
            <v-icon small left>
              fas fa-bullhorn
            </v-icon>
            ประกาศ
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <dialogs-confirm @confirm="confirmSend" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: null,
      valid: true,
      oneClick: false,
      rules: {
        text: [
          v => !!v || 'กรุณากรอกข้อความที่ต้องการประกาศ'
        ],
        image: [
          v => !!v || 'กรุณาเลือกรูปภาพที่ต้องการประกาศ',
          (v) => {
            const mimetypeImages = ['image/png', 'image/gif', 'image/jpg', 'image/jpeg']
            return !v || mimetypeImages.includes(v.type) || this.$t('IMG_ONLY')
          },
          v => !v || v.size <= 10000000 || this.$t('LESS_SIZE', { text: this.$t('FILE'), count: '10 MB' })
        ]
      },
      form: {}
    }
  },
  beforeMount () {
    this.clearData()
  },
  methods: {
    clearData () {
      this.form = {
        txt: '',
        img: null
      }
    },
    send () {
      if (this.$refs.form.validate()) {
        this.$bus.$emit('open-confirm-dialog', null, {
          header: {
            icon: 'fas fa-question-circle',
            text: `ยืนยันการประกาศ${this.tab === 0 ? 'ข้อความ' : 'รูปภาพ'}`
          },
          detail: {
            text: `ยืนยันความถูกต้องของ${this.tab === 0 ? 'ข้อความ' : 'รูปภาพ'} ที่ต้องการประกาศ`
          },
          yesBtn: {
            icon: 'fas fa-bullhorn',
            color: 'success',
            text: 'ประกาศ'
          },
          noBtn: {
            icon: 'fas fa-times',
            color: 'error',
            text: 'No'
          }
        })
      }
    },
    confirmSend () {
      console.log(this.form)
    }
  }
}
</script>

<style lang="scss" scoped>
.basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
