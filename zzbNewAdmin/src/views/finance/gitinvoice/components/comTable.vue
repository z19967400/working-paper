<template>
  <div class="table1-wrap">
    <div class="table1-box">
      <el-table :data="data.list" border style="width: 100%">
        <el-table-column
          v-for="(item, index) in tableOption"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        >
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
    list: []
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
  }
}
</style>
