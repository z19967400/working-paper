<template>
  <div id="paging" class="paging-wrap">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="watchChange"
      :current-page="data.Tpage"
      :page-sizes="[20, 50, 100, 200]"
      :page-size="limit || $store.state.layout.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalize"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import { PagingData } from '../../types/components/paging.interface'
// import {  } from "@/components" // 组件

@Component({})
export default class About extends Vue {
  // prop
  @Prop({
    required: false,
    default: ''
  })
  name!: string
  @Prop({}) totalize!: number
  @Prop({}) page!: number
  @Prop({}) limit?: number
  index: any = 1
  // data
  @Watch('page')
  pageChangeValue(newvalue: number, oldValue: number) {
    let self: any = this
    self.data.Tpage = newvalue
  }
  data: PagingData = {
    componentName: 'paging',
    Tpage: 1
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
  //翻页
  watchChange(index: number) {
    this.index = index
    this.$emit('watchChange', index, null)
  }
  handleSizeChange(val: any) {
    let data: any = {
      limit: val
    }
    // this.$store.dispatch("UPDATE_LAYOUY_STATE", data);
    this.$emit('watchChange', this.index, val)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.paging-wrap {
  width: 100%;
  position: relative;
  margin-top: 20px;
  text-align: center;
  justify-content: space-between;
}
</style>
