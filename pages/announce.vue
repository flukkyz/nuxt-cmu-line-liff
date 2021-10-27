<template>
  <div v-if="users" class="my-10">
    <v-card color="basil" elevation="0">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="display-1 basil--text">
          <span class="fas fa-bullhorn text-center" />
          ประกาศ
        </h1>
      </v-card-title>

      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="basil"
        grow
      >
        <v-tab>
          <v-icon left>
            fas fa-font
          </v-icon>
          ข้อความ
        </v-tab>
        <v-tab>
          <v-icon left>
            fas fa-image
          </v-icon>
          รูปภาพ
        </v-tab>
      </v-tabs>

      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="send">
          <v-textarea
            v-if="tab === 0"
            v-model="form.txt"
            label="ข้อความที่ประกาศ"
            autocomplete="off"
            autofocus
            outlined
            :rules="rules.text"
            required
          />
          <img-input
            v-else
            v-model="form.img"
            label="รูปภาพ"
            :rules="rules.image"
          />

          <v-row>
            <v-col cols="12" md="3">
              <v-radio-group
                v-model="form.send_type"
                class="mt-0"
              >
                <v-radio
                  label="ส่งให้ทุกคน"
                  value="all"
                />
                <v-radio
                  label="ส่งให้บุคลากรเท่านั้น"
                  value="personnel"
                />
                <v-radio
                  label="ส่งให้นักศึกษาเท่านั้น"
                  value="student"
                />
                <v-radio
                  label="ส่งให้เฉพาะ..."
                  value="select"
                />
                <v-radio
                  label="ส่งให้ทุกคน ยกเว้น..."
                  value="except"
                />
              </v-radio-group>
            </v-col>
            <v-col v-if="['select','except'].includes(form.send_type)" cols="12" md="9">
              <v-autocomplete
                v-model="form.users"
                :items="users"
                item-value="lineid"
                :filter="userFilters"
                outlined
                multiple
                :rules="rules.users"
                :label="`ค้นหาและเลือกสมาชิกที่ต้องการ${form.send_type === 'select' ? 'ส่ง' : 'ยกเว้น'}`"
                required
              >
                <template #item="item">
                  <v-list-item-icon>
                    <v-icon v-text="item.item.isStudent ? 'fas fa-user-graduate' : 'fas fa-user-tie'" />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-subtitle class="small" v-text="item.item.email" />
                    <v-list-item-title v-text="`${item.item.firstname} ${item.item.lastname}`" />
                    <v-list-item-subtitle v-text="item.item.organizationname" />
                  </v-list-item-content>
                </template>
                <template #selection="item">
                  <v-chip
                    v-bind="item.attrs"
                    :input-value="item.selected"
                    close
                    @click="item.select"
                    @click:close="removeUsers(item.item)"
                  >
                    <v-avatar left>
                      <v-icon v-text="item.item.isStudent ? 'fas fa-user-graduate' : 'fas fa-user-tie'" />
                    </v-avatar>
                    {{ `${item.item.firstname} ${item.item.lastname}` }}
                  </v-chip>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>

          <v-btn
            color="success"
            x-large
            depressed
            block
            type="submit"
            :disabled="oneClick"
          >
            <v-icon small left>
              fas fa-bullhorn
            </v-icon>
            ประกาศ
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <dialogs-confirm @confirm="confirmSend" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: null,
      valid: true,
      oneClick: false,
      users: null,
      rules: {
        text: [
          v => !!v || 'กรุณากรอกข้อความที่ต้องการประกาศ'
        ],
        image: [
          v => !!v || 'กรุณาเลือกรูปภาพที่ต้องการประกาศ',
          (v) => {
            const mimetypeImages = ['image/png', 'image/gif', 'image/jpg', 'image/jpeg']
            return !v || mimetypeImages.includes(v.type) || this.$t('IMG_ONLY')
          },
          v => !v || v.size <= 10000000 || this.$t('LESS_SIZE', { text: this.$t('FILE'), count: '10 MB' })
        ],
        users: [
          v => v.length > 0 || 'กรุณาเลือกสมาชิกอย่างน้อย 1 คน'
        ]
      },
      form: {}
    }
  },
  async beforeMount () {
    try {
      const datas = await this.$axios.$get(`${process.env.apiUrl}${process.env.apiDirectory}users`)
      this.users = datas.data
      this.clearData()
    } catch (e) {
      this.$nuxt.error({ statusCode: e.response.status, message: e.response.data.message })
    }
  },
  methods: {
    userFilters (item, queryText, itemText) {
      const email = item.email ? item.email.toLowerCase() : ''
      const firstname = item.firstname ? item.firstname.toLowerCase() : ''
      const lastname = item.lastname ? item.lastname.toLowerCase() : ''
      const organizationname = item.organizationname ? item.organizationname.toLowerCase() : ''
      const emailSwitch = item.email ? this.$charSwitch(item.email).toLowerCase() : ''
      const firstnameSwitch = item.firstname ? this.$charSwitch(item.firstname).toLowerCase() : ''
      const lastnameSwitch = item.lastname ? this.$charSwitch(item.lastname).toLowerCase() : ''
      const organizationnameSwitch = item.organizationname ? this.$charSwitch(item.organizationname).toLowerCase() : ''
      const searchText = queryText.toLowerCase().split(' ')
      return searchText.some(ele => email.includes(ele) ||
        firstname.includes(ele) ||
        lastname.includes(ele) ||
        organizationname.includes(ele) ||
        emailSwitch.includes(ele) ||
        firstnameSwitch.includes(ele) ||
        lastnameSwitch.includes(ele) ||
        organizationnameSwitch.includes(ele)
      )
    },
    removeUsers (item) {
      const index = this.form.users.indexOf(item.lineid)
      if (index >= 0) { this.form.users.splice(index, 1) }
    },
    clearData () {
      this.form = {
        txt: '',
        send_type: 'all',
        users: [],
        img: null
      }
    },
    send () {
      if (this.$refs.form.validate()) {
        this.$bus.$emit('open-confirm-dialog', null, {
          header: {
            icon: 'fas fa-question-circle',
            text: `ยืนยันการประกาศ${this.tab === 0 ? 'ข้อความ' : 'รูปภาพ'}`
          },
          detail: {
            text: `ยืนยันความถูกต้องของ${this.tab === 0 ? 'ข้อความ' : 'รูปภาพ'} ที่ต้องการประกาศ`
          },
          yesBtn: {
            icon: 'fas fa-bullhorn',
            color: 'success',
            text: 'ประกาศ'
          },
          noBtn: {
            icon: 'fas fa-times',
            color: 'error',
            text: 'No'
          }
        })
      }
    },
    async confirmSend () {
      try {
        const result = await this.$axios.$post(`${process.env.baseUrl}/api/announce`, this.form)
        if (result) {
          this.$notifier.showMessage({ title: 'ปรับปรุงข้อมูลสำเร็จ', content: `ปรับปรุงข้อมูล${this.modelName}สำเร็จ`, color: 'success' })
        }
      } catch (e) {
        this.$notifier.showMessage({ title: 'Error', content: e, color: 'error' })
      }
      this.$overlay.hide()
    }
  }
}
</script>

<style lang="scss" scoped>
.basil {
  background-color: #FFFBE6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>
