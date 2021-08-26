<template>
  <div>
    <h1 class="display-1 text-center mt-10">
      Apps
    </h1>
    <h1>is Get Profile: {{ isGetProfile ? 'T' : 'F' }}</h1>
    <div v-if="profile">
      <h1>Page Apps</h1>
      <v-img :src="profile.pictureUrl" contain />
      <p class="mt-3 mb-1 text-center">
        <span class="font-weight-bold">
          User ID:
        </span>
        {{ profile.userId }}
      </p>
      <h2 class="text-center">
        <span class="font-weight-bold">
          Display Name:
        </span>
        {{ profile.displayName }}
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data () {
    return {
      profile: null,
      isGetProfile: false
    }
  },
  mounted () {
    // this.$overlay.showLoading()
    liff.getProfile().then((profile) => {
      this.isGetProfile = true
      this.profile = profile
      // this.$overlay.hide()
    })
  }
}
</script>
