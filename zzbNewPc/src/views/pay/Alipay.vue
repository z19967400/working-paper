<template>
  <div class="Alipay-wrap">
    <div v-html="data.html"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
@Component({})
export default class About extends Vue {
  data: any = {
    html: ""
  };
  created() {
    //
  }
  activated() {
    //
  }
  mounted() {
    let self: any = this;
    window.addEventListener("message", e => {
      self.data.html = e.data.data;
      self.load();
    });
  }
  load() {
    let self: any = this;
    self.$nextTick(() => {
      document.forms[0].submit();
    });
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variables";

.Alipay-wrap {
  display: none;
}
</style>
