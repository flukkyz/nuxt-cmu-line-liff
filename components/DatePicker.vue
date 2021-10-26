<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    min-width="290px"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="dateText"
        :label="label"
        outlined
        :prepend-inner-icon="prependIcon"
        :rules="rules"
        readonly
        v-bind="attrs"
        required
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="model"
      :active-picker.sync="activePicker"
      :max="max"
      :min="min"
      :locale="$lang.getIso()"
      @input="saveDate"
    />
  </v-menu>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    prependIcon: {
      type: String,
      default: 'fas fa-calendar-day'
    },
    rules: {
      type: Array,
      default: Array
    },
    min: {
      type: String,
      default: undefined
    },
    max: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      dateText: '',
      activePicker: null,
      menu: false,
      model: null
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    }
  },
  methods: {
    saveDate (val) {
      this.$refs.menu.save(val)
      this.dateText = this.$dateText(this.model, 'long')
      this.$emit('input', val)
    }
  }
}
</script>
