<template>
  <div class="stepTwo2-wrap">
    <div class="top">
      <!-- 错误数量 -->
      <el-row type="flex" justify="right">
        <el-col :span="16">
          <el-tooltip
            style="margin-right:20px;"
            class="item"
            effect="dark"
            content="可单击单元格在线修改"
            placement="right"
            v-show="data.collTable.length > 0"
          >
            <span class="textred">
              <span style="color: #67c23a;" class="textred2"
                >总计{{ data.collTable.length }}条数据</span
              >
            </span>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="可单击单元格在线修改"
            placement="right"
            v-show="data.failcount > 0"
          >
            <span class="textred el-icon-warning-outline">
              <span style="color: #ec193a;" class="textred2"
                >共{{ data.failcount }}处错误,可点击在线修改</span
              >
            </span>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="可单击单元格在线修改"
            placement="right"
            v-show="data.failcount <= 0"
          >
            <span style="color:#67c23a;" class="textred el-icon-circle-check">
              <span style="color: #ec193a;" class="textred3"
                >上传成功，请核对无误后提交委托</span
              >
            </span>
          </el-tooltip>
        </el-col>
        <!-- <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
      <el-button>上左</el-button>
    </el-tooltip> -->
        <el-col :span="8">
          <!-- <span class="textred2">可双击单元格在线修改</span> -->
        </el-col>
      </el-row>
    </div>
    <el-tabs v-model="data.activeName" @tab-click="handleClick">
      <el-tab-pane label="债务信息" name="first">
        <el-table
          style="width: 100%"
          v-loading="data.loading"
          :height="data.height"
          :data="data.collTable"
          fixed
        >
          <el-table-column
            label="债务人编号"
            prop="index"
            width="100px"
          ></el-table-column>
          <el-table-column
            v-for="(item, index) in data.columnName"
            :key="index"
            :label="item.column_name"
            :prop="item.field_name + '.' + 'value'"
            :width="
              item.column_name.length * 20 <= 120
                ? 120
                : item.column_name.length * 20 + 'px'
            "
          >
            <template slot-scope="scope">
              <div
                @click="
                  changeEnddate(
                    item,
                    scope.row,
                    item.field_name,
                    scope.$index,
                    index
                  )
                "
                style="height: 40px;line-height: 40px"
                :class="scope.row[item.field_name].bol == 'True' ? '' : 'merge'"
              >
                {{ scope.row[item.field_name].value }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!-- <el-tab-pane label="债务明细" name="second">
        <el-table
          style="width: 100%"
          v-loading="data.loading"
          :height="data.height"
          max-height="450px"
          :data="data.collTabless"
        >
          <el-table-column
            v-for="(item, index) in data.columnNamess"
            :key="index"
            :label="item.column_name"
            :prop="item.field_name + '.' + 'value'"
          >
            <template slot-scope="scope">
              <div
                @click="
                  changeEnddate(
                    item,
                    scope.row,
                    item.field_name,
                    scope.$index,
                    index
                  )
                "
                :class="scope.row[item.field_name].bol == 'True' ? '' : 'merge'"
              >
                {{ scope.row[item.field_name].value }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane> -->
    </el-tabs>
    <el-row :gutter="20" class="buttonbb">
      <el-col :span="2">
        <el-button type="primary" :disabled="data.btnType" @click="sendPlace"
          >提交委托</el-button
        >
      </el-col>
      <el-col :span="2">
        <el-button @click="goList">上一步</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
// import {  } from "@/components" // 组件

@Component({})
export default class About extends Vue {
  // prop
  @Prop({}) height!: any
  @Prop({}) failcount!: any
  @Prop({}) collTable!: any
  @Prop({}) collTabless!: any
  @Prop({}) columnName!: any
  @Prop({}) columnNamess!: any
  @Prop({}) btnType!: any
  //watch
  @Watch('failcount', { deep: true, immediate: true })
  failcountWatch(newVal: any, oldVal: any) {
    this.data.failcount = newVal
  }
  @Watch('height', { deep: true, immediate: true })
  heightWatch(newVal: any, oldVal: any) {
    this.data.height = newVal
  }
  @Watch('collTable', { deep: true, immediate: true })
  collTableWatch(newVal: any, oldVal: any) {
    this.data.collTable = JSON.parse(JSON.stringify(newVal))
    this.data.collTable.forEach((item: any, index: number) => {
      item['index'] = index + 1
    })
    // eslint-disable-next-line no-console
    console.log(newVal)
  }
  @Watch('collTabless', { deep: true, immediate: true })
  collTablessWatch(newVal: any, oldVal: any) {
    this.data.collTabless = newVal
  }
  @Watch('columnName', { deep: true, immediate: true })
  columnNameWatch(newVal: any, oldVal: any) {
    this.data.columnName = newVal
    // eslint-disable-next-line no-console
    // console.log(newVal)
  }
  @Watch('columnNamess', { deep: true, immediate: true })
  columnNamessWatch(newVal: any, oldVal: any) {
    this.data.columnNamess = newVal
  }
  @Watch('btnType', { deep: true, immediate: true })
  btnTypeWatch(newVal: any, oldVal: any) {
    // eslint-disable-next-line no-console
    console.log(newVal)

    this.data.btnType = newVal
  }
  // data
  data: any = {
    activeName: 'first',
    loading: false,
    failcount: 0,
    height: 0,
    collTable: [],
    collTabless: [],
    columnName: [],
    columnNamess: [],
    btnType: false
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
  handleClick(tab: any, event: any) {
    this.data.loading = true
    setTimeout(() => {
      this.data.loading = false
    }, 1000)
  }
  //提交委托
  sendPlace() {
    this.$emit('tijiao')
  }
  //上一步
  goList() {
    this.$emit('go')
  }
  //修改
  changeEnddate(
    textindex: any,
    data: any,
    item: any,
    rownum: any,
    index: number
  ) {
    let parmas: any = {
      textindex,
      data,
      item,
      rownum,
      index,
      activeName: this.data.activeName
    }
    this.$emit('edit', parmas)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.stepTwo2-wrap {
  width: 100%;
  height: 100%;
  position: relative;
  .textred {
    color: #ec193a;
    font-size: $large-title;
    line-height: 40px;
    margin-right: 5px;
    cursor: pointer;
  }
  .textred2 {
    font-size: $fuzhu-font;
    color: $Secondary-text;
    display: inline-block;
    height: 100%;
    padding-left: 5px;
    position: relative;
    top: -2px;
  }
  .textred3 {
    font-size: $fuzhu-font;
    color: #67c23a !important;
    display: inline-block;
    height: 100%;
    padding-left: 5px;
    position: relative;
    top: -2px;
  }
  & .el-table th {
    font-weight: normal !important;
    color: #999;
  }
  & .el-row {
    margin-bottom: 0 !important;
    position: relative !important;
  }
  & .top {
    position: absolute;
    width: 55%;
    left: 138px;
    z-index: 10;
    & .el-row {
      height: 40px;
      line-height: 40px;
      & .el-col:nth-child(2) .textred2 {
        width: 100%;
        text-align: right;
      }
    }
  }
  & .el-tabs__item {
    font-size: 16px;
  }
  & .el-tabs__header {
    margin: 0;
  }
  & .buttonbb {
    margin-top: 20px;
  }
  & .merge {
    border: 1px solid #ec193a;
  }
  & .el-table {
    .cell {
      div {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  // & .el-dialog {
  //   width: 680px;
  // }
}
</style>
