<template>
  <div>
    <v-img src="/logo.png" contain />
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
