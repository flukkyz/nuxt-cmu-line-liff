<template>
  <v-app dark>
    <layouts-sidebar />
    <layouts-topbar />
    <v-main class="brown lighten-5">
      <v-container class="py-0 my-0">
        <breadcrumbs />
        <nuxt />
      </v-container>
    </v-main>
    <!-- <Footer /> -->
    <snackbar />
    <socket />
    <overlay />
    <b-t-t />
  </v-app>
</template>

<script>
export default {
  name: 'Default'
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
