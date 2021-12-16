<template>
  <div class="table1-wrap">
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
            type="text"
            class="info"
            size="small"
            @click="handleInfo(scope.$index, scope.row)"
            >查看</el-button
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
  @Prop({}) public index!: any
  //watch
  @Watch('tableData', { immediate: true, deep: true })
  onChangeValue(newVal: any, oldVal: any) {
    this.data.Data2 = newVal
  }
  @Watch('index', { immediate: true, deep: true })
  indexChangeValue(newVal: any, oldVal: any) {
    this.data.index = newVal
    let arr = this.data.Data2.filter((item: any, index: number) => {
      return index == newVal
    })
    this.data.Data = arr
  }
  // data
  data: any = {
    componentName: 'table',
    loading: false,
    Data: null,
    width: '0px',
    tabInfo: false,
    index: 0,
    Data2: null
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
  //查看详情
  handleInfo(index: number, row: any) {
    let self: any = this
    let params: any = {
      index,
      row
    }
    self.$emit('Info', params)
  }
  //删除
  handleDelete(index: number, row: any) {
    let self: any = this
    let params: any = {
      index,
      row
    }
    self
      .$confirm('您确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        self.$emit('Delete', params)
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

.table1-wrap {
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
