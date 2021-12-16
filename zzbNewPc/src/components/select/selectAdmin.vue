<template>
  <div class="selectAdmin-wrap">
    <div class="selectAdmin-box">
      <label class="label">选择会员</label>
      <el-select size="small" v-model="data.value" placeholder="请选择条件">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input
        size="small"
        v-model="data.input"
        @keyup.enter.native="search"
        placeholder="请输入内容"
      ></el-input>
      <el-button
        @click="search"
        size="small"
        type="primary"
        icon="el-icon-search"
        plain
        >查询</el-button
      >
      <el-button
        @click="quxiao"
        size="small"
        type="primary"
        style="margin-right:0;"
        plain
        >取消</el-button
      >
    </div>
    <div v-show="data.tableData.length > 0" class="selectTable">
      <el-table
        highlight-current-row
        :data="data.tableData"
        border
        style="100%"
      >
        <el-table-column prop="id" label="ID" width="80px"> </el-table-column>
        <el-table-column prop="name" label="会员名称"> </el-table-column>
        <el-table-column label="操作" width="80px">
          <template slot-scope="scope">
            <el-button type="text" @click="select(scope.row)" size="small"
              >选择</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="data.tableData2.length > 0" class="selectTable">
      <el-table
        highlight-current-row
        :data="data.tableData2"
        border
        style="100%"
      >
        <el-table-column prop="account_name" label="账户名称">
        </el-table-column>
        <el-table-column prop="admin_name" label="管理员名称">
        </el-table-column>
        <el-table-column label="操作" width="80px">
          <template slot-scope="scope">
            <el-button type="text" @click="select2(scope.row)" size="small"
              >选择</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
// import {  } from "@/components" // 组件

@Component({})
export default class About extends Vue {
  // prop
  @Prop() options!: any;
  @Prop() tabal?: any;
  @Prop() tabal2?: any;
  //watch
  @Watch("tabal", { deep: true })
  tabalChange(newVal: any, oldVal: any) {
    this.data.tableData = newVal;
  }
  @Watch("tabal2", { deep: true })
  tabal2Change(newVal: any, oldVal: any) {
    this.data.tableData2 = newVal;
  }
  // data
  data: any = {
    componentName: "test",
    input: "", //输入值
    value: "", //选择值
    tableData: [],
    tableData2: []
  };

  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    //
  }
  //搜索
  search() {
    if (this.data.value == "") {
      let self: any = this;
      self.$message.warning("请选择查询条件");
      return false;
    }
    if (this.data.value != "" && this.data.input == "") {
      let self: any = this;
      self.$message.warning("请选择输入查询内容条件");
      return false;
    }
    if (this.data.input != "" && this.data.value != "") {
      if (this.data.input.length > 50) {
        let self: any = this;
        self.$message.warning("查询内容不得超过50字");
        return false;
      }
      let data: any = {
        label: this.data.value,
        value: this.data.input
      };
      this.$emit("search", data);
    } else {
      return false;
    }
  }
  //取消
  quxiao() {
    this.$emit("quxiao");
  }
  //选择会员
  select(data: any) {
    this.$emit("select", data);
  }
  //选择管理员
  select2(data: any) {
    this.$emit("select2", data);
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variables";

.selectAdmin-wrap {
  // width: 100%;
  display: inline-block;
  .selectAdmin-box {
    margin-bottom: 20px;
    display: inline-block;
    .el-input {
      width: auto;
      margin-right: 20px;
    }
    .label {
      font-size: $Text-font;
      color: $General-colors;
      margin-right: 20px;
    }
    .el-button {
      margin-right: 15px;
    }
  }
  .selectTable {
    width: 605px;
    margin: 20px 0 10px 0;
    .el-table--border th:nth-child(3),
    .el-table--border td:nth-child(3) {
      text-align: center;
    }
    .el-button--text {
      color: #67c23a;
    }
  }
}
</style>
