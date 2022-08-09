<template>
  <div class="table4-wrap">
    <el-table
      :data="data.Data"
      style="width: 100%"
      highlight-current-row
      border
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
          <div
            v-if="
              item.prop == 'bill_number_1' ||
                item.prop == 'bill_number_2' ||
                item.prop == 'bill_number_3'
            "
          >
            <el-link
              v-if="
                Entrust_type == 'Entrust_type_6' &&
                  scope.row[item.prop] == null &&
                  item.prop == 'bill_number_1'
              "
              @click="Related(scope.row.id)"
              type="success"
            >
              关联账单
            </el-link>
            <el-link v-else @click="open(scope.row[item.prop])" type="success">
              {{ scope.row[item.prop] }}
            </el-link>
          </div>
          <div
            style="text-align:right;"
            v-else-if="
              item.prop == 'float_service_rate' ||
                item.prop == 'new_management_rate' ||
                item.prop == 'collection_amount' ||
                item.prop == 'float_service_fee' ||
                item.prop == 'fixed_service_fee' ||
                item.prop == 'management_fee' ||
                item.prop == 'lawyer_fee'
            "
          >
            <span>{{ scope.row[item.prop] }}</span>
          </div>
          <span v-else>{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" :width="data.width" label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            class="info"
            size="small"
            :disabled="
              scope.row.bill_number_1 ||
                scope.row.bill_number_2 ||
                scope.row.bill_number_3
            "
            @click="handleInfo(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            class="delete"
            size="small"
            :disabled="
              scope.row.bill_number_1 ||
                scope.row.bill_number_2 ||
                scope.row.bill_number_3
            "
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
import { TableData } from '../../../../../types/components/table.interface'

@Component({})
export default class About extends Vue {
  // prop
  @Prop({}) public tableType!: any
  @Prop({}) public tableData!: any
  @Prop({}) Entrust_type!: string
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
    self.data.width = '120px'
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
    self.$emit('info', params)
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
  //跳转详情
  open(path: string) {
    const self: any = this
    let path2: string = path.replace('_关联', '')
    let bill_number: string = path2.substring(0, path2.lastIndexOf('（'))
    self.$router.push({
      path: `/business/listbill/getadmindata/${bill_number}`
    })
  }
  //关联账单
  Related(id: number) {
    this.$emit('Related', id)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.table4-wrap {
  width: 100%;
  position: relative;
  // .el-table th:last-child > .cell {
  //   text-align: center !important;
  // }
  // .el-table tr td:last-child > .cell {
  //   text-align: center !important;
  // }
  & .edit {
    color: #55a3f4;
  }
  & .el-table thead {
    color: #999;
  }
  & .el-table {
    color: #555;
  }
  & .el-table th > .cell {
    font-weight: normal;
  }
  & .info,
  & .complete {
    color: #67c23a;
  }
  & .delete {
    color: #f56c6c;
  }
  & .warting {
    color: #e6a23c;
  }
  & .ongoing {
    color: #409eff;
  }
  & .el-table .cell {
    // padding-left: 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .close {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    font-size: 16px;
  }
  & .el-table__body tr.current-row > td {
    background-color: #f5f7fa;
  }
  & .is-disabled {
    color: #c0c4cc !important;
  }
}
</style>
