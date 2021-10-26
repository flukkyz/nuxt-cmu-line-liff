<template>
  <v-card class="mb-5">
    <v-card-title class="py-3">
      <p class="body-1 mb-0 mr-2">
        {{ label }}
      </p>
      <v-tooltip v-if="newPdfPreview && uploadPdf" right>
        <template #activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            small
            color="accent"
            v-on="on"
            @click="onUpload"
          >
            fas fa-upload
          </v-icon>
        </template>
        <span>{{ uploadPdfText }}</span>
      </v-tooltip>
      <template v-if="removePdf && oldPdf && !newPdfPreview">
        <v-spacer />
        <v-tooltip left>
          <template #activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              small
              color="error"
              v-on="on"
              @click="onRemovePdf"
            >
              fas fa-trash
            </v-icon>
          </template>
          <span>{{ removePdfText }}</span>
        </v-tooltip>
      </template>
    </v-card-title>
    <v-divider />
    <pdf-view
      v-if="newPdfPreview"
      class="mb-5"
      :src="newPdfPreview"
      height="400px"
      hide-save
      hide-print
      bg-color="info lighten-1"
      navigation-color="info"
    />
    <pdf-view
      v-if="oldPdf"
      class="mb-5"
      :src="oldPdf"
      height="400px"
      hide-save
      hide-print
    />
    <v-card-text>
      <v-file-input
        v-model="model"
        class="pa-0 ma-0"
        accept=".pdf"
        :prepend-icon="prependIcon"
        :rules="rules"
        :show-size="1000"
        @change="changePdf"
      >
        <template #label>
          <span class="caption">{{ $t('LESS_SIZE', { text: $t('FILE'), count: '10 MB' }) }}</span>
        </template>
      </v-file-input>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    value: {
      type: File,
      default: null
    },
    oldPdf: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    prependIcon: {
      type: String,
      default: 'fas fa-file-alt'
    },
    changePdfText: {
      type: String,
      default: 'Change Pdf'
    },
    uploadPdf: {
      type: Boolean,
      default: false
    },
    removePdf: {
      type: Boolean,
      default: false
    },
    uploadPdfText: {
      type: String,
      default: 'Upload'
    },
    removePdfText: {
      type: String,
      default: 'Remove Pdf'
    },
    rules: {
      type: Array,
      default: Array
    }
  },
  data () {
    return {
      model: null,
      newPdfPreview: null
    }
  },
  methods: {
    changePdf (val) {
      this.$emit('input', val)
      if (val) {
        this.newPdfPreview = URL.createObjectURL(val)
      } else {
        this.newPdfPreview = null
      }
    },
    onUpload () {
      this.newPdfPreview = null
      this.model = null
      this.$emit('upload')
    },
    onRemovePdf () {
      this.$emit('remove')
    }
  }
}
</script>
