<template>
  <div v-if="datas" class="my-5">
    <div class="float-right mt-1">
      <v-btn small elevation="0" outlined color="info" @click="onAdd">
        <v-icon class="mr-1" x-small>
          fas fa-plus
        </v-icon>
        เพิ่มประเภท FAQ
      </v-btn>
    </div>
    <h2>
      <span class="fas fa-question-circle" />
      จัดการข้อมูลคำถามที่พบบ่อย (FAQ)
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
        :expanded.sync="expanded"
        show-expand
        single-expand
      >
        <template #expanded-item="{ item }">
          <td :colspan="headers.length">
            <v-list color="transparent">
              <v-subheader>FAQs</v-subheader>
              <template v-if="item.faqs.length > 0">
                <v-list-item v-for="(faq,i) in item.faqs" :key="`${item._id}-${i}`">
                  <v-list-item-content>
                    <v-list-item-title>
                      <span class="font-weight-bold">Q:</span>
                    &nbsp;
                      {{ faq.question }}
                    </v-list-item-title>
                    <v-list-item-title>
                      <span class="font-weight-bold">A:</span>
                    &nbsp;
                      <span style="white-space: pre-line">{{ faq.answer }}</span>
                    </v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-action>
                    <div class="d-flex">
                      <v-icon color="warning" class="mr-2" x-small @click="onEditQuestion(item,i)">
                        fas fa-edit
                      </v-icon>
                      <v-icon color="error" x-small @click="onDeleteQuestion(item,i)">
                        fas fa-trash
                      </v-icon>
                    </div>
                  </v-list-item-action>
                </v-list-item>
              </template>
              <template v-else>
                <v-list-item>
                  <v-list-item-title>
                    <div class="text-center">
                      <p class="grey--text headline mb-1">
                        ยังไม่มี FAQ
                      </p>
                    </div>
                  </v-list-item-title>
                </v-list-item>
              </template>
              <v-list-item>
                <v-list-item-title>
                  <div class="text-center">
                    <v-btn
                      small
                      elevation="0"
                      class="mb-3"
                      outlined
                      color="info"
                      @click="onAddQuestion(item)"
                    >
                      <v-icon class="mr-1" x-small>
                        fas fa-plus
                      </v-icon>
                      เพิ่ม FAQ
                    </v-btn>
                  </div>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </td>
        </template>
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
    <forms-faq @add="saveAdd" @edit="saveEdit" />
    <forms-question @add="saveAddQuestion" @edit="saveEditQuestion" />
    <dialogs-delete @delete="saveDelete" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      modelName: ' FAQ ',
      api: `${process.env.apiUrl}${process.env.apiDirectory}faqs`,
      search: '',
      expanded: [],
      headers: [
        {
          text: 'ประเภท FAQ',
          value: 'title'
        },
        {
          text: '',
          value: 'data-table-expand'
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
      const datas = await this.$axios.$get(`${this.api}`)
      this.datas = datas.data
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
  },
  methods: {
    onAdd () {
      this.$bus.$emit('open-faq-form')
    },
    async saveAdd (data) {
      try {
        const result = await this.$axios.$post(`${this.api}/title`, data)
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
      this.$bus.$emit('open-faq-form', item)
    },
    async saveEdit (data) {
      try {
        const result = await this.$axios.$put(`${this.api}/title/${data._id}`, data)
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
      this.$bus.$emit('open-delete-dialog', item._id, item.title)
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
    },
    onAddQuestion (item) {
      this.$bus.$emit('open-question-form', item)
    },
    async saveAddQuestion (dataFaq, data) {
      dataFaq.faqs.push({
        question: data.question,
        answer: data.answer
      })
      await this.saveEdit(dataFaq)
    },
    onEditQuestion (item, index) {
      this.$bus.$emit('open-question-form', item, index)
    },
    async saveEditQuestion (dataFaq, index, data) {
      dataFaq.faqs[index] = data
      await this.saveEdit(dataFaq)
    },
    onDeleteQuestion (item, index) {
      item.faqs.splice(index, 1)
    }
  }
}
</script>
