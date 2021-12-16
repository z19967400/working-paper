<template>
  <div>
    <el-select v-model="value" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-input
      v-model.trim="input"
      placeholder="请输入搜索内容"
      clearable
    ></el-input>
  </div>
</template>

<script>
export default {
  name: "search",
  props: ["options"],
  data() {
    return {
      //选择的内容
      value: "",
      // 输入的内容
      input: "",
      // 未改变前的内容
      data: []
    };
  },
  computed: {
    datass: {
      get: function() {
        return this.data;
      },
      set: function() {
        // console.log(this.datass);
        return (this.datass[this.value] = this.input);
      }
    }
  }
};
</script>

<style></style>
