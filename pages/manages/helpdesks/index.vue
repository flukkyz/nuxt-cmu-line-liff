<template>
  <div v-if="datas" class="mt-10 mb-5">
    <h2>
      <span class="fas fa-users-cog" />
      การแจ้งปัญหาของผู้ใช้งาน
    </h2>
    <v-card class="mt-5">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="`ค้นหาหัวข้อที่แจ้ง หรือ ชื่อผู้แจ้ง`"
          single-line
          hide-details
        />
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="datas"
        :search="search"
        :footer-props="{
          itemsPerPageOptions: [10,20,50,100,300,500]
        }"
      >
        <template #[`item.helpdesk`]="{ item }">
          <v-list-item @click="$router.push(localePath({name: 'manages-helpdesks-id',params: {id: item._id}}))">
            <v-list-item-icon>
              <v-tooltip
                top
              >
                <template #activator="{ on, attrs }">
                  <v-icon v-bind="attrs" :color=" item.admin_reply ? 'primary' : 'success'" v-on="on">
                    {{ item.admin_reply ? 'far fa-comment-alt' : 'far fa-comments' }}
                  </v-icon>
                </template>
                <span>{{ item.admin_reply ? 'ต้องการให้ตอบกลับ' : 'ข้อเสนอแนะ' }}</span>
              </v-tooltip>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Single-line item</v-list-item-title>
              <v-list-item-subtitle>Secondary text</v-list-item-subtitle>
              <v-list-item-subtitle class="grey--text mt-3">
                {{ item.message[0].content }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <!-- <p class="grey--text mb-0">
                {{ $dateText(item.createdAt) }}
              </p> -->
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modelName: 'ผู้ใช้งาน',
      api: `${process.env.apiUrl}${process.env.apiDirectory}helpdesks`,
      search: '',
      headers: [
        {
          value: 'helpdesk'
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
  }
}
</script>
