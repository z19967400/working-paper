<template>
  <el-radio-group v-model="radio">
    <el-radio
      :label="item.dic_code"
      v-for="(item, index) in menulist"
      :key="index"
      >{{ item.dic_content }}</el-radio
    >
  </el-radio-group>
</template>

<script>
export default {
  name: "menuRaido",
  data() {
    return {
      radio: ""
    };
  },
  props: ["menulist", "radios"],
  watch: {
    radios: function(newVal, oldVal) {
      this.radio = oldVal;
    }
  }
};
</script>

<style>
.el-radio__input.is-checked + .el-radio__label {
  color: #ec193a;
}
.el-radio__input.is-checked .el-radio__inner {
  background: #ec193a;
  border-color: #ec193a;
}
</style>
