<template>
  <v-card class="mb-5" elevation="0" color="grey lighten-4">
    <v-card-title class="py-3">
      <p class="body-1 mb-0 mr-2">
        {{ label }}
      </p>
      <v-tooltip v-if="newImgPreview && uploadImage" right>
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
        <span>{{ uploadImageText }}</span>
      </v-tooltip>
      <template v-if="removeImage && oldImage && !newImgPreview">
        <v-spacer />
        <v-tooltip left>
          <template #activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              small
              color="error"
              v-on="on"
              @click="onRemoveImage"
            >
              fas fa-trash
            </v-icon>
          </template>
          <span>{{ removeImageText }}</span>
        </v-tooltip>
      </template>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-img v-if="newImgPreview" class="mb-5" :src="newImgPreview" contain aspect-ratio="1.618" />
      <v-img v-else-if="oldImage" class="mb-5" :src="oldImage" contain aspect-ratio="1.618" />
      <v-file-input
        v-model="model"
        class="pa-0 ma-0"
        accept="image/*"
        :prepend-icon="prependIcon"
        :rules="rules"
        :show-size="1000"
        @change="changeImage"
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
    oldImage: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    prependIcon: {
      type: String,
      default: 'fas fa-image'
    },
    changeImageText: {
      type: String,
      default: 'Change Image'
    },
    uploadImage: {
      type: Boolean,
      default: false
    },
    removeImage: {
      type: Boolean,
      default: false
    },
    uploadImageText: {
      type: String,
      default: 'Upload'
    },
    removeImageText: {
      type: String,
      default: 'Remove Image'
    },
    rules: {
      type: Array,
      default: Array
    }
  },
  data () {
    return {
      model: null,
      newImgPreview: null
    }
  },
  methods: {
    changeImage (val) {
      this.$emit('input', val)
      if (val) {
        this.newImgPreview = URL.createObjectURL(val)
      } else {
        this.newImgPreview = null
      }
    },
    onUpload () {
      this.newImgPreview = null
      this.model = null
      this.$emit('upload')
    },
    onRemoveImage () {
      this.$emit('remove')
    }
  }
}
</script>
