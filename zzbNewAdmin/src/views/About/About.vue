<template>
  <div class="About-warp">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class About extends Vue {
  //
}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
.About-warp {
  height: 100%;
  width: 100%;
}
</style>
