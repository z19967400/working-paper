<template>
  <div class="table2-wrap">
    <div class="table2-box">
      <el-table align="left" :header-cell-style="{'text-align':'left'}" :cell-style="{'text-align':'left'}" :data="data.list" style="width: 100%">
        <el-table-column v-for="(item, index) in tableOption" :key="index" :prop="item.prop" :label="item.label" :width="item.width">
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
  .el-table th > .cell {
    text-align: center;
    font-weight: normal;
  }
}
</style>
