<template>
  <div v-if="datas" class="my-5">
    <h2>
      <span class="fas fa-users-cog" />
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
      >
        <template #[`item.name`]="{ item }">
          {{ item.firstname }}
          {{ item.lastname }}
        </template>
        <template #[`item.role`]="{ item }">
          <div class="d-flex">
            <v-switch
              v-model="item.isAdmin"
              inset
              class="ml-auto"
              @change="switchRole(item)"
            />
          </div>
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
      api: `${process.env.apiUrl}${process.env.apiDirectory}users`,
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
      this.datas = datas.data.map((ele) => {
        return {
          ...ele,
          isAdmin: ele.role === 'admin'
        }
      })
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
  },
  methods: {
    async switchRole (item) {
      item.role = item.role === 'admin' ? 'member' : 'admin'
      try {
        const result = await this.$axios.$put(`${this.api}/${item._id}`, item)
        await this.$fetch()
        if (result) {
          this.$notifier.showMessage({ title: 'ปรับปรุงข้อมูลสำเร็จ', content: `ปรับปรุงข้อมูล${this.modelName}สำเร็จ`, color: 'success' })
        }
      } catch (e) {
        this.$notifier.showMessage({ title: 'Error', content: e, color: 'error' })
      }
    }
  }
}
</script>
