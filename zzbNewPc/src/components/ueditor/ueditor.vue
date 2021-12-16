<template>
  <div class="ueditor-wrap">
    <vue-ueditor-wrap v-model="content" :config="config"></vue-ueditor-wrap>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
//@ts-ignore
import VueUeditorWrap from "vue-ueditor-wrap";
//@ts-ignore
@Component({
  components: {
    VueUeditorWrap
  }
})
export default class About extends Vue {
  // prop
  @Prop({ default: null }) value!: any;

  // data
  //编辑器实例

  @Watch("value")
  valueChange(val: any, oldVal: any) {
    if (val != null) {
      this.content = val;
    }
  }
  @Watch("content")
  contentChange(val: any, oldVal: any) {
    this.$emit("getVal", val);
  }
  content: any = "";
  config: any = {
    UEDITOR_HOME_URL: "/ueditor/" // 需要令此处的URL等于对应 ueditor.config.js 中的配置。
  };
  created() {
    this.content = "";
  }

  activated() {
    //
  }

  mounted() {
    //
  }
  beforeDestroy() {
    //
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variables";

.ueditor-wrap {
  width: 100%;
  .edui-editor-iframeholder {
    min-height: 300px;
  }
  .edui-default .edui-editor-toolbarbox {
    position: relative !important;
  }
}
</style>
