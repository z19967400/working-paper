<template>
  <div class="table2-wrap">
    <el-table
      id="comTable"
      :data="data.Data"
      style="width: 100%"
      highlight-current-row
      fixed
    >
      <el-table-column
        v-for="(item, index) in tableType"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <div slot="reference" class="cell">
            {{ scope.row[item.prop] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :width="data.width" label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.is_allocated != '已分配'"
            type="text"
            class="delete"
            size="small"
            @click="handleDelete(scope.$index, scope.row)"
            >分配案件</el-button
          >
          <el-button
            v-else
            type="text"
            class="delete"
            size="small"
            @click="handleDelete2(scope.$index, scope.row)"
            >撤销分配</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { TableData } from '../../../../../types/components/table.interface'

@Component({})
export default class About extends Vue {
  // prop
  @Prop({}) public tableType!: any
  @Prop({}) public tableData!: any
  //watch
  @Watch('tableData', { immediate: true, deep: true })
  onChangeValue(newVal: any, oldVal: any) {
    this.data.Data = newVal
  }
  // data
  data: TableData = {
    componentName: 'table',
    loading: false,
    Data: null,
    width: '0px',
    tabInfo: false
  }
  created() {
    this.$nextTick(() => {
      let Wheight: number | null = document.body.offsetHeight
    })
  }

  activated() {
    //
  }

  mounted() {
    let self: any = this
    self.data.width = '80px'
  }
  //初始化
  init() {
    //
  }

  //分配律师
  handleDelete(index: number, row: any) {
    let self: any = this
    let params: any = {
      index,
      row
    }
    self
      .$confirm('您确定分配给该律师吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        self.$emit('distribution', params)
      })
      .catch(() => {
        self.$message({
          type: 'info',
          message: '已撤销分配'
        })
      })
  }
  handleDelete2(index: number, row: any) {
    let self: any = this
    let params: any = {
      index,
      row
    }
    self
      .$confirm('您确定撤销分配吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        self.$emit('revoke', params)
      })
      .catch(() => {
        self.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.table2-wrap {
  width: 100%;
  position: relative;
  .el-table th:last-child > .cell {
    text-align: center;
  }
  .el-table tr td:last-child > .cell {
    text-align: center;
  }
  .edit {
    color: #55a3f4;
  }
  .el-table thead {
    color: #999;
  }
  .el-table {
    color: #555;
  }
  .el-table th > .cell {
    font-weight: normal;
  }
  .info {
    color: #67c23a;
  }
  .delete {
    color: #f56c6c;
  }
  .el-table .cell {
    padding-left: 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .close {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    font-size: 16px;
  }
  & .el-table__body tr.current-row > td {
    background-color: #f5f7fa;
  }
}
</style>
