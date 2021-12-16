<template>
  <div class="table1-wrap">
    <div class="table1-box">
      <el-table
        border
        :data="data.list"
        class="table-right"
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
            <span
              :class="
                item.label == '违约金/利息/滞纳金' || item.label == '欠款本金'
                  ? 'cell-right'
                  : ''
              "
              v-else
            >
              {{ scope.row[item.prop] }}
            </span>
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

  mounted() {
    //
  }
  //
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
}
</style>
