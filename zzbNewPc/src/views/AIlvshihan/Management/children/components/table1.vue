<template>
  <div class="table1-wrap">
    <div class="table1-box">
      <el-table
        border
        :data="data.list"
        class="table-right"
        style="width: 100%"
        highlight-current-row
      >
        <el-table-column
          v-for="(item, index) in tableOption"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
          <template slot-scope="scope">
            <div v-if="item.label == '审核状态'" class="cell">
              <el-link
                :underline="false"
                :class="{ info: scope.row[item.prop] == '执行中' }"
                :type="
                  scope.row[item.prop] === '待审核' ||
                  scope.row[item.prop] === '待执行'
                    ? 'warning'
                    : scope.row[item.prop] === '已完成' || '已通过'
                    ? 'success'
                    : scope.row[item.prop] === '执行中'
                    ? 'info'
                    : 'danger'
                "
                >{{ scope.row[item.prop] }}</el-link
              >
            </div>
            <div v-else-if="getLabel(item.label) != -1">
              <div style="text-align:right">
                <el-popover
                  placement="top-start"
                  trigger="click"
                  :content="tostr(scope.row[item.prop])"
                  popper-class="table-click"
                >
                  <span slot="reference">
                    {{ thousandBitSeparator(scope.row[item.prop]) }}
                  </span>
                </el-popover>
              </div>
            </div>
            <div
              v-else
              class="cell"
              :class="
                item.label == '违约金/利息/滞纳金' || item.label == '欠款本金'
                  ? 'cell-right'
                  : ''
              "
            >
              <el-tooltip v-if="item.label == '债务反馈'" placement="top">
                <span slot="content">
                  <span v-html="huanhang(scope.row[item.prop])"></span>
                </span>
                <span>
                  {{ scope.row[item.prop] }}
                </span>
              </el-tooltip>
              <el-popover
                v-else
                placement="top-start"
                trigger="click"
                :content="tostr(scope.row[item.prop])"
                popper-class="table-click"
              >
                <span slot="reference">
                  {{ scope.row[item.prop] }}
                </span>
              </el-popover>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";

@Component({})
export default class About extends Vue {
  // prop
  @Prop() tableData!: any;
  @Prop() tableOption!: any;
  //Watch
  @Watch("tableData", { deep: true, immediate: true })
  tableDataChange(newVal: any, oldVal: any) {
    this.data.list = newVal;
  }
  // data
  data: any = {
    list: []
  };

  created() {
    //
  }

  activated() {
    //
  }

  mounted() {}
  //转字符串
  tostr(val: any) {
    if (val != null) {
      return val.toString();
    } else {
      return val;
    }
  }
  //检测label是否含有金额
  getLabel(str: string) {
    return str.indexOf("金额");
  }
  //千位符
  thousandBitSeparator(num: any): any {
    if (num) {
      let val: string = num.toString();
      //不含小数点
      if (val.indexOf(".") == -1) {
        // eslint-disable-next-line no-console
        return Number(num).toLocaleString() + ".00";
      } else {
        //含有小数点
        let ws: string = val.substring(val.lastIndexOf(".") + 1, val.length);
        let ss: number = Number(val.substring(0, val.lastIndexOf(".")));
        if (ws.length == 1) {
          //小数点后有一位
          return Number(num).toLocaleString() + "0";
        } else if (ws.length == 2) {
          //小数点后有两位
          return ss.toLocaleString() + "." + ws;
        } else {
          let val1: any = Number(num).toFixed(2);
          return this.thousandBitSeparator(val1);
        }
      }
    }
  }
  //换行
  huanhang(str: any) {
    if (str) {
      return str.replace("\n", `<br/>`);
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/scss/variables";

.table1-wrap {
  width: 100%;
  & .el-table .cell {
    text-align: left;
    font-weight: normal;
  }
  & > .table1-box {
    & > .table-right {
      & .el-table__row {
        & .cell-right {
          display: inline-block;
          width: 120px;
          text-align: right;
        }
      }
    }
  }
  & .el-table .cell {
    padding-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .el-table__body tr.current-row > td {
    background-color: #f5f7fa;
  }
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
