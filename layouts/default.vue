<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>

<style lang="scss">
  .v-application {
    background-color: #FFF !important;
  }
  .text-field-right{
    .v-text-field__slot{
    input{
      text-align: right !important;
    }
    }
  }
  .pointer {
    cursor: pointer;
  }
  .on-center{
    position: absolute !important;
    transform: translate(-50%,-50%) !important;
  }
  .w-100{
    width: 100%;
  }
  .w-90{
    width: 90%;
  }
  .w-80{
    width: 80%;
  }
  .w-75{
    width: 75%;
  }
  .w-70{
    width: 70%;
  }
  .w-65{
    width: 65%;
  }
  .w-50{
    width: 50%;
  }
  .w-35{
    width: 35%;
  }
  .w-30{
    width: 30%;
  }
  .w-25{
    width: 25%;
  }
  .w-20{
    width: 20%;
  }
  .w-10{
    width: 10%;
  }
  .h-100{
    height: 100%;
  }
  .h-75{
    height: 75%;
  }
  .h-70{
    height: 70%;
  }
  .h-65{
    height: 65%;
  }
  .h-50{
    height: 50%;
  }
  .h-25{
    height: 25%;
  }
  a:hover,
  a:visited,
  a:link,
  a:active {
      text-decoration: none;
  }
  .top-items{
    align-items: flex-start;
  }
  .center-items{
    align-items: center;
  }
  .bottom-items{
    align-items: flex-end;
  }
  .small{
    font-size: 0.7rem !important;
  }
  .very-small{
    font-size: 0.6rem !important;
  }
  .translucent{
    background-color: rgba(255, 255, 255, 0.1);
  }
</style>
