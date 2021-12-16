<template>
  <div class="tab-wrap">
    <el-table
      border
      :height="height"
      v-loading="data.loading"
      :data="data.Data"
      style="width: 100%"
      highlight-current-row
      fixed
    >
      <el-table-column
        v-for="(item, index) in dataData"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            trigger="click"
            :content="tostr(scope.row[item.prop])"
            popper-class="table-click"
            :visible-arrow="false"
          >
            <div slot="reference" class="cell">
              {{ scope.row[item.prop] }}
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :width="data.width" label="操作">
        <template slot-scope="scope">
          <el-button
            class="info"
            type="text"
            size="small"
            @click="handleAdmin(scope.$index, scope.row)"
            >管理</el-button
          >
          <el-button
            type="text"
            class="delete"
            size="small"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import { TableData } from '../../../../types/components/table.interface'

@Component({})
export default class About extends Vue {
  // prop
  @Prop({}) public tableType!: any
  @Prop({}) public tableData!: any
  @Prop({}) public load!: boolean
  @Prop({}) public info?: boolean

  //watch
  @Watch('tableData')
  onChangeValue(newVal: Array<object>, oldVal: Array<object>) {
    if (newVal != undefined && newVal.length != 0) {
      newVal.forEach((item: any) => {
        if (item.head_img != undefined) {
          item.head_img = item.head_img.substr(5)
        }
        if (item.create_time != undefined) {
          item.create_time = item.create_time.replace('T', ' ').substr(0, 16)
        }
        if (item.send_time != undefined) {
          item.send_time = item.send_time.replace('T', ' ').substr(0, 16)
        }
        if (item.state != undefined) {
          item.state = item.state == 0 ? true : false
        }
      })
    }

    this.data.Data = newVal
  }
  @Watch('load')
  loadChangeValue(newVal: boolean, oldVal: boolean) {
    this.data.loading = newVal
  }
  @Watch('info')
  infoChangeValue(newVal: boolean, oldVal: boolean) {
    this.data.tabInfo = newVal
  }
  @Watch('checkList')
  checkListChangeValue(newVal: any, oldVal: any) {
    if (newVal.length == this.datattp.length) {
      this.checkAll = true
    } else {
      this.checkAll = false
    }
  }
  // data
  data: TableData = {
    componentName: 'table',
    loading: false,
    Data: null,
    width: '120px',
    tabInfo: false
  }
  datattp: any = []
  dataData: any = []
  checkList: any = []
  isIndeterminate: boolean = false
  checkAll: boolean = true
  tableSelectType: boolean = false
  height: number = 0
  defaultImg: string =
    'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  created() {
    this.$nextTick(() => {
      let Wheight: number | null = document.body.offsetHeight
      let select: any = document.getElementById('select')
      let operation: any = document.getElementById('operation')
      let paging: any = document.getElementById('paging')
      let selectH: number = select != null ? select.offsetHeight : 0
      let operationH: number = operation != null ? operation.offsetHeight : 0
      let pagingH: number = paging != null ? paging.offsetHeight : 0
      this.height = Wheight - (pagingH + operationH + selectH + 178)
      if (this.info != undefined) {
        this.data.tabInfo = this.info
      }
    })
  }

  activated() {
    this.init()
  }

  mounted() {
    let self: any = this
  }
  //初始化
  init() {
    let self: any = this
    self.datattp = [...self.tableType]
    self.dataData = [...self.tableType]
    let value: string = localStorage.getItem(self.$route.path) || ''
    if (value != '') {
      self.dataData = self.dataData.filter((item: any) => {
        return value.indexOf(item.label) != -1
      })
      this.datattp.forEach((item: any, index: number) => {
        item.index = index
        if (value.indexOf(item.label) != -1) {
          item.checked = true
        } else {
          item.checked = false
        }
      })
    } else {
      this.datattp.forEach((item: any, index: number) => {
        item.index = index
        item.checked = true
      })
    }
  }
  //管理
  handleAdmin(index: number, row: any) {
    this.$emit('admin', row)
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
  //转字符串
  tostr(val: any) {
    if (val != null) {
      return val.toString()
    } else {
      return val
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.tab-wrap {
  width: 100%;
  position: relative;
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
    color: #67c23a !important;
  }
  .delete {
    color: #f56c6c;
  }
  .el-table .cell {
    // padding-left: 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    // text-align: center;
    padding-left: 5px;
  }
  .close {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    font-size: 16px;
  }
}
.el-table__body tr.current-row > td {
  background-color: #f5f7fa;
}
.table-select {
  max-width: 600px;
  position: fixed;
  z-index: 1000;
  background-color: white;
  box-shadow: 0 2px 9px #a29a9a;
  padding: 20px 40px;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  .el-checkbox {
    margin-bottom: 20px;
  }
  .select-header {
    font-size: 14px;
    margin-bottom: 30px;
    color: #606266;
  }
  .el-checkbox-group {
    min-height: 150px;
  }
  .table-select-buttom {
    text-align: center;
    margin-top: 30px;
  }
}
.table-wrap .el-table .cell {
  cursor: pointer;
}
.table-click {
  background-color: #303133;
  color: #fff;
  padding: 12px;
  font-size: 12px;
  max-width: 200px;
  min-width: 50px !important;
}
</style>
