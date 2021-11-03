<template>
  <v-dialog v-model="dialog" persistent max-width="400">
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
            v-model="form.name"
            :label="modelName"
            autocomplete="off"
            autofocus
            outlined
            :rules="rules.name"
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
      modelName: 'ประเภทการแจ้งปัญหา',
      mode: 'add',
      oneClick: false,
      rules: {
        name: [
          v => !!v || `กรุณากรอก${this.modelName}`
        ]
      },
      form: {}
    }
  },
  created () {
    this.$bus.$on('open-category-form', (data) => {
      this.$overlay.showLoading()
      this.oneClick = false
      this.clearData()
      this.mode = 'add'
      if (data) {
        this.mode = 'edit'
        this.form = { ...data }
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
    this.$bus.$off('open-category-form')
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$overlay.hide()
    },
    clearData () {
      this.form = {
        name: ''
      }
    },
    save () {
      if (this.$refs.form.validate()) {
        this.$overlay.showLoading()
        this.oneClick = true
        this.$emit(this.mode, this.form)
        this.dialog = false
      }
    }
  }
}
</script>
