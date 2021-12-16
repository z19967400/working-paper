<template>
  <div class="table2-wrap">
    <div class="table2-box">
      <el-table highlight-current-row :data="data.list" style="width: 100%">
        <el-table-column v-for="(item, index) in tableOption" :key="index" :prop="item.prop" :label="item.label" :width="item.width">
          <template slot-scope="scope">
            <div style="color:#E6A23C;" v-if="scope.row[item.prop]== '待执行' && item.prop == 'execution_status'">{{scope.row[item.prop]}}</div>
            <div style="color:#409EFF;" v-else-if="scope.row[item.prop] == '执行中' && item.prop == 'execution_status'">{{scope.row[item.prop]}}</div>
            <div style="color:#67C23A;" v-else-if="scope.row[item.prop] == '执行成功' && item.prop == 'execution_status'">{{scope.row[item.prop]}}</div>
            <div style="color:#e01f3c;" v-else-if="scope.row[item.prop] == '执行失败'&& item.prop == 'execution_status'">{{scope.row[item.prop]}}</div>
            <div style="color:#e01f3c;" v-else-if="scope.row[item.prop] == '已终止'&& item.prop == 'execution_status'">{{scope.row[item.prop]}}</div>
            <div style="color:#e01f3c;" v-else-if="scope.row[item.prop] == '已撤销'&& item.prop == 'execution_status'">{{scope.row[item.prop]}}</div>
            <div v-else>{{scope.row[item.prop]}}</div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" class="info" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

@Component({})
export default class About extends Vue {
  // prop
  @Prop() tableData!: any
  @Prop() tableOption!: any
  //Watch
  @Watch('tableData', { deep: true })
  tableDataChange(newVal: any, oldVal: any) {
    this.data.list = newVal
  }
  // data
  data: any = {
    list: [],
  }

  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    //
  }
  //查看
  handleClick(val: any) {
    this.$emit('info', val)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.table2-wrap {
  width: 100%;
  & .el-table .cell {
    text-align: left !important;
    font-weight: normal;
  }
  & .el-table__body tr.current-row > td {
    background-color: #f5f7fa;
  }
}
</style>
