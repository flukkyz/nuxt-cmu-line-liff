<template>
  <div>
    <p v-if="$lang.isTh()" class="caption mb-0">
      {{ `${user.firstname_TH} ${user.lastname_TH}` }}
    </p>
    <p v-if="$lang.isEn()" class="caption mb-0">
      {{ `${user.firstname_EN} ${user.lastname_EN}` }}
    </p>
    <p class="mb-0 very-small d-none d-md-block">
      <span v-if="$lang.isTh()">
        {{ user.organization_name_TH }}
      </span>
      <span v-if="$lang.isEn()">
        {{ user.organization_name_EN }}
      </span>
    </p>
    <p class="mb-0 very-small d-sm-block d-md-none">
      <span v-if="$lang.isTh()">
        {{ user.organization_name_TH }}
      </span>
      <span v-if="$lang.isEn()">
        {{ user.organization_name_EN }}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null
    }
  }
}
</script>
