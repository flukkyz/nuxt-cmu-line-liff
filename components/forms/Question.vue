<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-form ref="form" v-model="valid" @submit.prevent="save">
      <v-card>
        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-toolbar-title>
            <v-icon class="mr-2">
              {{ mode === 'add' ? 'fas fa-plus' : 'fas fa-edit' }}
            </v-icon>
            {{ mode === 'add' ? `เพิ่ม${modelName}` : `ปรับปรุง${modelName}` }}
          </v-toolbar-title>
          <v-spacer />
          <v-btn fab x-small text @click="closeDialog">
            <v-icon>
              fas fa-times
            </v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            v-model="form.question"
            label="คำถาม"
            autocomplete="off"
            autofocus
            outlined
            :rules="rules.question"
            required
          />
          <v-textarea
            v-model="form.answer"
            label="คำตอบ"
            autocomplete="off"
            outlined
            :rules="rules.answer"
            required
          />
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" x-large block type="submit" :disabled="oneClick">
            บันทึก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      valid: true,
      modelName: ' FAQ ',
      mode: 'add',
      oneClick: false,
      dataFaq: null,
      index: null,
      rules: {
        question: [
          v => !!v || 'กรุณากรอกคำถาม'
        ],
        answer: [
          v => !!v || 'กรุณากรอกคำตอบ'
        ]
      },
      form: {}
    }
  },
  created () {
    this.$bus.$on('open-question-form', (dataFaq, index = null) => {
      this.$overlay.showLoading()
      this.oneClick = false
      this.dataFaq = dataFaq
      this.clearData()
      this.mode = 'add'
      if (index && index !== null) {
        this.index = index
        this.mode = 'edit'
        this.form = { ...dataFaq.faqs[index] }
      }
      this.dialog = true
      setTimeout(() => {
        if (this.$refs.form) {
          this.$refs.form.resetValidation()
        }
      })
    })
  },
  beforeDestroy () {
    this.$bus.$off('open-question-form')
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$overlay.hide()
    },
    clearData () {
      this.form = {
        question: '',
        answer: ''
      }
    },
    save () {
      if (this.$refs.form.validate()) {
        this.$overlay.showLoading()
        this.oneClick = true
        if (this.mode === 'add') {
          console.log(this.mode)
          this.$emit(this.mode, this.dataFaq, this.form)
        } else {
          console.log(this.mode)
          this.$emit(this.mode, this.dataFaq, this.index, this.form)
        }
        this.dialog = false
      }
    }
  }
}
</script>
