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
        <template #[`item.name`]="{ item }">
          {{ item.firstname }}
          {{ item.lastname }}
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
          text: 'Name',
          value: 'name'
        },
        {
          text: 'หน่วยงาน',
          value: 'organizationname'
        },
        {
          text: 'E-mail',
          value: 'email'
        },
        {
          text: 'ผู้ดูแลระบบ',
          class: 'text-right',
          value: 'role'
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
