<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">
          <v-icon v-if="options.header.icon" class="mr-2">
            {{ options.header.icon }}
          </v-icon>
          {{ options.header.text }}
        </v-card-title>

        <v-card-text v-if="options.detail && options.detail.text" class="pl-14">
          {{ options.detail.text }}
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            text
            :color="options.noBtn && options.noBtn.color || ''"
            :disabled="oneClick"
            @click="closeDialog"
          >
            <v-icon v-if="options.noBtn && options.noBtn.icon" small class="mr-2">
              {{ options.noBtn && options.noBtn.icon }}
            </v-icon>
            {{ options.noBtn && options.noBtn.text || 'No' }}
          </v-btn>

          <v-btn
            :color="options.yesBtn && options.yesBtn.color || ''"
            :disabled="oneClick"
            @click="onConfirm"
          >
            <v-icon v-if="options.yesBtn && options.yesBtn.icon" small class="mr-2">
              {{ options.yesBtn && options.yesBtn.icon }}
            </v-icon>
            {{ options.yesBtn && options.yesBtn.text || 'Yes' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      dialog: false,
      options: {
        header: {
          icon: 'fas fa-question-circle',
          text: 'NOTE'
        },
        detail: {
          text: ''
        },
        yesBtn: {
          icon: 'fas fa-check',
          color: 'primary',
          text: 'Yes'
        },
        noBtn: {
          icon: 'fas fa-times',
          color: 'primary',
          text: 'No'
        }
      },
      oneClick: false,
      params: {}
    }
  },
  created () {
    this.$bus.$on(`open-confirm-dialog${(this.value ? `-${this.value}` : '')}`, (params, options) => {
      this.$overlay.showLoading()
      this.oneClick = false
      if (options) {
        this.options = this.$_.merge(this.options, options)
      }
      this.params = params
      this.dialog = true
    })
  },
  beforeDestroy () {
    this.$bus.$off(`open-confirm-dialog${(this.value ? `-${this.value}` : '')}`)
  },
  methods: {
    closeDialog () {
      this.dialog = false
      this.$overlay.hide()
    },
    onConfirm () {
      this.oneClick = true
      this.$emit('confirm', this.params)
      this.dialog = false
    }
  }
}
</script>
