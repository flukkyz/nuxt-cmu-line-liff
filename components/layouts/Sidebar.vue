<template>
  <div>
    <v-navigation-drawer
      v-if="$auth.loggedIn"
      v-model="drawer"
      width="350"
      app
      temporary
    >
      <v-system-bar color="accent" />
      <v-list class="pt-0">
        <template v-for="(item, index) in sideItems">
          <v-subheader
            v-if="item.header"
            :key="`${item.header}-${index}`"
            class=" font-weight-bold"
            v-text="item.header"
          />

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset"
          />

          <v-list-group
            v-else-if="item.group"
            :key="`${item.group}-${index}`"
            :value="$route.name && item.items.map(ele => ele.url).includes($route.name.replaceAll(/-id|-form/gi,'').slice(0, -5))"
            no-action
          >
            <template #activator>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.group" />
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="(subItem, i) in item.items"
              :key="`${item.group}-${i}`"
              class="pl-9"
              link
              :to="localePath(subItem.url)"
            >
              <v-list-item-icon>
                <v-icon small v-text="subItem.icon" />
              </v-list-item-icon>
              <v-list-item-title class="caption" v-text="subItem.text" />
            </v-list-item>
          </v-list-group>

          <v-list-item
            v-else
            :key="`${item.text}-${index}`"
            router
            exact
            :to="localePath(item.url)"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.text" />
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <template #append>
        <div class="pa-2">
          <v-btn v-if="$auth.loggedIn" block text color="secondary" @click.stop="logout">
            <v-icon small left>
              fas fa-sign-out-alt
            </v-icon>
            {{ $t('LOGOUT') }}
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  props: {
    back: Boolean
  },
  data () {
    return {
      sideItems: []
    }
  },
  computed: {
    drawer: {
      get () {
        return this.$store.state.drawer
      },
      set (val) {
        this.$store.commit('setDrawer', val)
      }
    },
    iconName () {
      return this.$auth.loggedIn ? this.$auth.user.firstname_EN.replaceAll(/เ|แ|โ|ไ|ใ/g, '').substring(0, 1) + this.$auth.user.lastname_EN.replaceAll(/เ|แ|โ|ไ|ใ/g, '').substring(0, 1) : ''
    }
  },
  created () {
    this.$bus.$on('reset-side-menu', () => {
      this.resetSideMenu()
    })
  },
  beforeDestroy () {
    this.$bus.$off('reset-side-menu')
  },
  mounted () {
    this.resetSideMenu()
  },
  methods: {
    logout () {
      this.$router.push(this.localePath({ name: 'logout' }))
    },
    resetSideMenu () {
      // this.sideItems.push({
      //   url: { name: 'my-researchs' },
      //   icon: 'fas fa-flask',
      //   text: 'โครงการวิจัยของฉัน'
      // })
      // this.sideItems.push({
      //   group: 'โครงการวิจัยของฉัน',
      //   items: [
      //     {
      //       url: { name: 'my-researchs' },
      //       icon: 'fas fa-receipt',
      //       text: 'โครงการวิจัยล่าสุด'
      //     },
      //     {
      //       url: { name: 'my-researchs-histories' },
      //       icon: 'fas fa-receipt',
      //       text: 'ประวัติการเบิกเงินโครงการวิจัย'
      //     }
      //   ]
      // })
      this.sideItems.push({
        icon: 'fas fa-th-large',
        text: 'Dashboard',
        url: { name: 'dashboard' }
      })
      this.sideItems.push({
        group: 'รายงาน',
        icon: 'fas fa-list-alt',
        items: [
          {
            url: 'reports-process-duration',
            icon: 'fas fa-list-alt',
            text: 'รายงานสรุประยะเวลาในการดำเนินการเบิกเงินโครงการวิจัย'
          },
          {
            url: 'reports-average-process-duration',
            icon: 'fas fa-list-alt',
            text: 'รายงานสรุประยะเวลาเฉลี่ยในการดำเนินการเบิกเงินโครงการวิจัย'
          },
          {
            url: 'reports-research-project-withdraw',
            icon: 'fas fa-list-alt',
            text: 'รายงานการเบิกจ่ายเงินโครงการวิจัย'
          },
          {
            url: 'reports-research-project-withdraw-detail',
            icon: 'fas fa-list-alt',
            text: 'รายละเอียดการเบิกจ่ายเงินโครงการวิจัย'
          },
          {
            url: 'reports-summary-tax-adress',
            icon: 'fas fa-list-alt',
            text: 'สรุปที่อยู่ออกใบกำกับภาษี และที่อยู่จัดส่งใบกำกับภาษี'
          },
          {
            url: 'reports-van-transaction',
            icon: 'fas fa-list-alt',
            text: 'รายการเคลื่อนไหวเงินเข้าบัญชี VAN'
          },
          {
            url: 'reports-transfer-to-research-support-fund',
            icon: 'fas fa-list-alt',
            text: 'รายการโอนเงินเข้าบัญชีกองทุนสนับสนุนการวิจัย'
          }
        ]
      })
      this.sideItems.push({
        header: 'จัดการ'
      })
      this.sideItems.push({
        url: { name: 'researchs' },
        icon: 'fas fa-list',
        text: 'จัดการโครงการวิจัย'
      })
      this.sideItems.push({
        url: { name: 'groups' },
        icon: 'fas fa-layer-group',
        text: 'สรุปรายการ และสั่งจ่ายเงินวิจัย'
      })
      this.sideItems.push({
        divider: true
      })
      this.sideItems.push({
        group: 'ตั้งค่า',
        icon: 'fas fa-cogs',
        items: [
          {
            url: 'settings-segment-groups',
            icon: 'fas fa-cog',
            text: 'Segment Groups'
          }
        ]
      })
    }
  }
}
</script>
