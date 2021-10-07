<template>
  <div>
    <v-img src="/images/logo.png" contain max-width="300" class="ma-auto" />
  </div>
</template>

<script>
export default {
  layout: 'empty',
  beforeMount () {
    liff.init({ liffId: '1656332858-DgV6jA5l' })
  }

}
</script>
