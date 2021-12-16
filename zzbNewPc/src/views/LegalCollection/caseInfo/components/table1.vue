<template>
  <div class="table1-wrap">
    <div class="table1-box">
      <el-table align="left" :header-cell-style="{'text-align':'left'}" :cell-style="{'text-align':'left'}" :data="data.list" style="width: 100%">
        <el-table-column v-for="(item, index) in tableOption" :key="index" :prop="item.prop" :label="item.label" :width="item.width">
          <template slot-scope="scope">
            <div v-if="item.label == '审核状态'" class="cell">
              <el-link :underline="false" :class="{ info: scope.row[item.prop] == '执行中' }" :type="
                  scope.row[item.prop] === '待审核' ||
                  scope.row[item.prop] === '待执行'
                    ? 'warning'
                    : scope.row[item.prop] === '已完成'
                    ? 'success'
                    : scope.row[item.prop] === '执行中'
                    ? 'info'
                    : 'danger'
                ">{{ scope.row[item.prop] }}</el-link>
            </div>
            <span v-else>
              {{ scope.row[item.prop] }}
            </span>
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
  @Watch('tableData', { deep: true, immediate: true })
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
  //
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.table1-wrap {
  width: 100%;
  .el-table th > .cell {
    text-align: center;
    font-weight: normal;
  }
}
</style>
