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
              <v-list-item-title class="caption">
                <v-badge
                  v-if="subItem.noti"
                  :content="noti"
                  :value="noti"
                  color="warning"
                >
                  {{ subItem.text }}
                </v-badge>
                <span v-else>
                  {{ subItem.text }}
                </span>
              </v-list-item-title>
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
              <v-list-item-title class="caption">
                <v-badge
                  v-if="item.noti"
                  :content="noti"
                  :value="noti"
                  color="warning"
                >
                  {{ item.text }}
                </v-badge>
                <span v-else>
                  {{ item.text }}
                </span>
              </v-list-item-title>
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
    noti: {
      get () {
        return this.$store.state.noti
      },
      set (val) {
        this.$store.commit('setNoti', val)
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
      this.sideItems.push({
        icon: 'fas fa-th-large',
        text: 'Dashboard',
        url: { name: 'dashboard' }
      })
      this.sideItems.push({
        icon: 'fas fa-bullhorn',
        text: 'ประกาศ',
        url: { name: 'announce' }
      })
      this.sideItems.push({
        header: 'จัดการ'
      })
      this.sideItems.push({
        url: { name: 'manages-helpdesks' },
        icon: 'fas fa-info-circle',
        text: 'การแจ้งปัญหาของผู้ใช้งาน',
        noti: true
      })
      this.sideItems.push({
        url: { name: 'manages-helpdesks-histories' },
        icon: 'fas fa-history',
        text: 'ประวัติการแจ้งปัญหา'
      })
      this.sideItems.push({
        group: 'รายงาน',
        icon: 'fas fa-list-alt',
        items: [
          {
            url: 'reports-reports1',
            icon: 'fas fa-list-alt',
            text: 'รายงาน 1'
          },
          {
            url: 'reports-reports2',
            icon: 'fas fa-list-alt',
            text: 'รายงาน 2'
          }
        ]
      })
      this.sideItems.push({
        divider: true
      })
      this.sideItems.push({
        group: 'ตั้งค่า',
        icon: 'fas fa-cogs',
        items: [
          {
            url: { name: 'settings-faqs' },
            icon: 'fas fa-question-circle',
            text: 'คำถามที่พบบ่อย (FAQ)'
          },
          {
            url: 'settings-categories',
            icon: 'fas fa-cubes',
            text: 'ประเภทการแจ้งปัญหา'
          },
          {
            url: 'settings-users',
            icon: 'fas fa-users-cog',
            text: 'ผู้ใช้งาน'
          }
        ]
      })
    }
  }
}
</script>
