<template>
  <div v-if="datas" class="my-5">
    <div class="float-right mt-1">
      <v-btn small elevation="0" outlined color="info" @click="onAdd">
        <v-icon class="mr-1" x-small>
          fas fa-plus
        </v-icon>
        เพิ่ม{{ modelName }}
      </v-btn>
    </div>
    <h2>
      <span class="fas fa-question-circle" />
      จัดการข้อมูล{{ modelName }}
    </h2>
    <v-card class="mt-5">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="`ค้นหา${modelName}`"
          single-line
          hide-details
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="datas"
        :search="search"
        item-key="_id"
      >
        <template #[`item.edit`]="{ item }">
          <div class="text-right mr-4">
            <v-icon color="warning" small @click="onEdit(item)">
              fas fa-edit
            </v-icon>
          </div>
        </template>
        <template #[`item.delete`]="{ item }">
          <div class="text-right mr-4">
            <v-icon color="error" small @click="onDelete(item)">
              fas fa-trash
            </v-icon>
          </div>
        </template>
      </v-data-table>
    </v-card>
    <forms-category @add="saveAdd" @edit="saveEdit" />
    <dialogs-delete @delete="saveDelete" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      modelName: 'ประเภทการแจ้งปัญหา',
      api: `${process.env.apiUrl}${process.env.apiDirectory}categories`,
      search: '',
      headers: [
        {
          text: 'ประเภทการแจ้งปัญหา',
          value: 'name'
        },
        {
          text: 'ปรับปรุง',
          class: 'text-right',
          value: 'edit'
        },
        {
          text: 'ลบ',
          class: 'text-right',
          value: 'delete'
        }
      ],
      datas: null
    }
  },
  async fetch () {
    try {
      const datas = await this.$axios.$get(this.api)
      this.datas = datas.data
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
  },
  methods: {
    onAdd () {
      this.$bus.$emit('open-category-form')
    },
    async saveAdd (data) {
      try {
        const result = await this.$axios.$post(this.api, data)
        await this.$fetch()
        if (result) {
          this.$notifier.showMessage({ title: 'เพิ่มข้อมูลสำเร็จ', content: `เพิ่มข้อมูล${this.modelName}สำเร็จ`, color: 'success' })
        }
      } catch (e) {
        this.$notifier.showMessage({ title: 'Error', content: e, color: 'error' })
      }
      this.$overlay.hide()
    },
    onEdit (item) {
      this.$bus.$emit('open-category-form', item)
    },
    async saveEdit (data) {
      try {
        const result = await this.$axios.$put(`${this.api}/${data._id}`, data)
        await this.$fetch()
        if (result) {
          this.$notifier.showMessage({ title: 'ปรับปรุงข้อมูลสำเร็จ', content: `ปรับปรุงข้อมูล${this.modelName}สำเร็จ`, color: 'success' })
        }
      } catch (e) {
        this.$notifier.showMessage({ title: 'Error', content: e, color: 'error' })
      }
      this.$overlay.hide()
    },
    onDelete (item) {
      this.$bus.$emit('open-delete-dialog', item._id, item.name)
    },
    async saveDelete (id) {
      try {
        const result = await this.$axios.$delete(`${this.api}/${id}`)
        await this.$fetch()
        if (result) {
          this.$notifier.showMessage({ title: 'ลบข้อมูลสำเร็จ', content: `ลบข้อมูล${this.modelName}สำเร็จ`, color: 'success' })
        }
      } catch (e) {
        this.$notifier.showMessage({ title: 'Error', content: e, color: 'error' })
      }
      this.$overlay.hide()
    }
  }
}
</script>
