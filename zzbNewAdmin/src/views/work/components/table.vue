<template>
  <div class="table1-wrap">
    <div class="table1-box">
      <el-table
        ref="moviesTable2"
        v-loading="loading"
        max-height="500"
        :data="data.list"
        style="width: 100%"
      >
        <el-table-column
          v-for="(item, index) in tableOption"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <div>
              <el-popover
                placement="bottom"
                trigger="click"
                :content="tostr(scope.row[item.prop])"
                popper-class="table-click"
                :visible-arrow="false"
              >
                <div slot="reference" class="cell">
                  <span
                    v-if="
                      item.prop === 'send_time' || item.prop === 'create_time'
                    "
                    >{{ timeStr(scope.row[item.prop]) }}</span
                  >
                  <el-link
                    @click="open(scope.row[item.prop])"
                    v-else-if="item.prop === 'authorization_file'"
                    type="success"
                    >查看</el-link
                  >
                  <span v-else-if="item.prop == 'creditor_type'">
                    {{
                      scope.row[item.prop] == 'Creditor_states_1'
                        ? '个人'
                        : '企业'
                    }}
                  </span>
                  <span v-else>{{ scope.row[item.prop] }}</span>
                </div>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button
              @click="editClick(scope.row)"
              class="edit"
              type="text"
              size="small"
              >审核</el-button
            >
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
export default class Table extends Vue {
  // prop
  @Prop() tableData!: any
  @Prop() tableOption!: any
  @Prop() loading!: boolean
  //Watch
  @Watch('tableData', { deep: true })
  tableDataChange(newVal: any, oldVal: any) {
    this.data.list = newVal
  }
  // data
  data: any = {
    list: []
  }

  created() {
    this.$nextTick(() => {
      const moviesTable: any = this.$refs.moviesTable2
      moviesTable.bodyWrapper.addEventListener('scroll', this.handlScorll, true)
    })
  }

  activated() {
    //
  }

  mounted() {
    //
  }
  //编辑
  editClick(val: any) {
    this.$emit('edit', val)
  }
  //转字符串
  tostr(val: any) {
    if (val != null) {
      return val.toString()
    } else {
      return val
    }
  }
  //查看
  open(val: string) {
    window.open(val)
  }
  handlScorll(res: any) {
    let height = res.target
    let clientHeight = height.clientHeight
    let scrollTop = height.scrollTop
    let scrollHeight = height.scrollHeight
    if (clientHeight + scrollTop >= scrollHeight) {
      this.$emit('load')
    }
  }
  beforeDestroy() {
    window.removeEventListener('scroll', this.handlScorll)
  }
  //检测label是否含有金额
  getLabel(str: string) {
    return str.indexOf('金额')
  }
  //千位符
  thousandBitSeparator(num: any): any {
    if (num) {
      let val: string = num.toString()
      //不含小数点
      if (val.indexOf('.') == -1) {
        return Number(num).toLocaleString() + '.00'
      } else {
        //含有小数点
        let ws: string = val.substring(val.lastIndexOf('.') + 1, val.length)
        let ss: number = Number(val.substring(0, val.lastIndexOf('.')))
        if (ws.length == 1) {
          //小数点后有一位
          return Number(num).toLocaleString() + '0'
        } else if (ws.length == 2) {
          //小数点后有两位
          return ss.toLocaleString() + '.' + ws
        } else {
          let val1: any = Number(num).toFixed(2)
          return this.thousandBitSeparator(val1)
        }
      }
    }
  }
  //时间处理
  timeStr(str: string) {
    let val1: string = str.replace('T', ' ')
    let val2: string = val1.substring(0, val1.lastIndexOf(':'))
    return val2
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.table1-wrap {
  width: 100%;
  .el-table th > .cell {
    text-align: left !important;
  }
  .edit {
    color: #67c23a;
  }
  & .el-table .cell {
    padding-left: 0px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .el-button.is-disabled {
    color: #c0c4cc !important;
  }
}
</style>
