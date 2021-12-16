<template>
  <div class="table1-wrap">
    <div class="table1-box">
      <el-table
        ref="moviesTable2"
        v-loading="loading"
        max-height="500"
        :data="data.list"
        border
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
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              :disabled="data.states == 'Audit_states_2'"
              @click="editClick(scope.row)"
              class="edit"
              type="text"
              size="small"
              >修改</el-button
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
export default class About extends Vue {
  // prop
  @Prop() tableData!: any
  @Prop() tableOption!: any
  @Prop() states!: string
  @Prop() loading!: boolean
  //Watch
  @Watch('tableData', { deep: true })
  tableDataChange(newVal: any, oldVal: any) {
    this.data.list = newVal
  }
  @Watch('states', { deep: true })
  statesChange(newVal: string, oldVal: string) {
    // eslint-disable-next-line no-console
    console.log(newVal)

    this.data.states = newVal
  }
  // data
  data: any = {
    list: [],
    states: ''
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
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.table1-wrap {
  width: 100%;
  .el-table th > .cell {
    text-align: center;
  }
  .edit {
    color: #55a3f4;
  }
  & .el-button.is-disabled {
    color: #c0c4cc !important;
  }
}
</style>
