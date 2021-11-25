<template>
  <div v-if="datas" class="mt-10 mb-5">
    <h2 class="primary--text">
      <span class="fas fa-history" />
      ประวัติการแจ้งปัญหา
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
        :items="dataFilters"
        hide-default-header
        :footer-props="{
          itemsPerPageOptions: [10,20,50,100,300,500]
        }"
      >
        <template #body="props">
          <tr
            v-for="(item, index) in props.items"
            :id="`table-item-${item.id}`"
            :key="index"
          >
            <td>
              <v-list-item @click="$router.push(localePath({name: 'manages-helpdesks-id',params: {id: item._id}}))">
                <v-list-item-icon>
                  <v-tooltip top>
                    <template #activator="{ on, attrs }">
                      <v-icon
                        v-bind="attrs"
                        large
                        :color=" item.admin_reply ? 'primary' : 'success'"
                        v-on="on"
                      >
                        {{ item.admin_reply ? `${item.mode === 'start' ? 'fas' : 'far'} fa-comments` : `${item.mode === 'read' ? 'fas' : 'far'} fa-comment-alt` }}
                      </v-icon>
                    </template>
                    <span>{{ item.admin_reply ? 'ต้องการให้ตอบกลับ' : 'ข้อเสนอแนะ' }}</span>
                  </v-tooltip>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-if="item.user_detail" class="title">
                    <v-badge v-if="item.mode === 'wait'" dot color="warning">
                      {{ `${item.user_detail[0].firstname} ${item.user_detail[0].lastname}` }}
                    </v-badge>
                    <span v-else>
                      {{ `${item.user_detail[0].firstname} ${item.user_detail[0].lastname}` }}
                    </span>
                  </v-list-item-title>
                  <v-list-item-subtitle class="mt-1">
                    <v-icon x-small>
                      fas fa-sitemap
                    </v-icon>
                    {{ item.user_detail[0].organizationname }}
                    &nbsp;
                    <v-icon x-small>
                      far fa-envelope
                    </v-icon>
                    {{ item.user_detail[0].email }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="info--text mt-3 caption">
                    {{ item.message[0].content.length > 100 ? `${item.message[0].content.substring(0, 100)}...` : item.message[0].content }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action class="align-self-start">
                  <p class="grey--text caption mb-0">
                    {{ $dateText(item.createdAt,'medium','long') }}
                  </p>
                </v-list-item-action>
              </v-list-item>
            </td>
          </tr>
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
      api: `${process.env.apiUrl}${process.env.apiDirectory}helpdesks/history`,
      search: '',
      headers: [
        {
          value: 'helpdesk',
          class: 'px-0 ma-0'
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
  computed: {
    dataFilters () {
      let dataFilters = this.datas
      if (this.search) {
        const search = this.search
        dataFilters = dataFilters.filter((item) => {
          return [
            this.$findSome(search, item.message[0].content),
            this.$findSome(search, item.user_detail[0].firstname),
            this.$findSome(search, item.user_detail[0].lastname),
            this.$findSome(search, item.user_detail[0].email),
            this.$findSome(search, item.user_detail[0].organizationname)
          ].some(ele => ele)
        })
      }
      return dataFilters
    }
  }
}
</script>
