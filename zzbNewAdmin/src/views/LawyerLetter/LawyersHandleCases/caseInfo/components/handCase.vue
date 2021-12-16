<template>
  <div :style="{ height: data.height + 'px' }" class="handCase-wrap">
    <div class="section">
      <span style="margin-top:0;">
        <span class="title">法院信息</span>
      </span>
      <el-divider></el-divider>
      <comTab1
        :tableData="data.handCase.court"
        :tableType="data.courtType"
        @info="courtInfo"
      ></comTab1>
    </div>
    <div v-for="(item, index) in data.matters" :key="index" class="section">
      <span style="margin-top:0;">
        <span class="title">{{ item.matters_name }}</span>
      </span>
      <el-divider></el-divider>
      <comTab1
        :tableData="item.list"
        :tableType="data.matterType"
        :index="index"
        @info="matterInfo"
      ></comTab1>
    </div>
    <el-dialog title="案件详情" :visible.sync="data.dialogVisible">
      <el-steps
        direction="vertical"
        finish-status="success"
        :active="data.infoData.length"
      >
        <el-step
          v-for="(item, index) in data.infoData"
          :key="index"
          :title="item.name"
        >
          <div slot="description">
            <span
              v-if="
                item.control_type != 'Control_type_9' &&
                  item.control_type != 'Control_type_8'
              "
              >{{ item.form_value }}</span
            >
            <img
              @click="preview(item.form_value)"
              v-if="item.control_type == 'Control_type_8'"
              :src="item.form_value"
              width="120px"
              alt=""
            />
            <div v-if="item.control_type == 'Control_type_9'">
              <img
                @click="preview(item2)"
                style="margin-right:20px;"
                v-for="(item2, index2) in item.form_value.split(',')"
                width="120px"
                :key="index2"
                :src="item2"
              />
            </div>
          </div>
        </el-step>
      </el-steps>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import comTab3 from './table3.vue'
import comTab1 from './table1.vue'
import * as Api from '../../../../../api/business'
@Component({
  components: {
    comTab3,
    comTab1
  }
})
export default class About extends Vue {
  // prop
  @Prop({ required: false, default: '' }) handCase!: any
  @Prop() height!: number
  //Watch
  @Watch('handCase', { deep: true, immediate: true })
  handCaseChangeVal(newVal: any, oldVal: any) {
    let self: any = this
    // eslint-disable-next-line no-console
    // console.log(newVal)
    // if (newVal.matters.matters_from != undefined) {
    //   newVal.matters.matters_from.forEach((item: any) => {
    //     item.execution_status =
    //       item.execution_status == -1 ? '未开始' : item.execution_status == 0 ? '进行中' : '已完成'
    //   })
    // }
    if (newVal.matters.matters != undefined) {
      self.data.matters = []
      newVal.matters.matters.forEach((item: any) => {
        item.list = newVal.matters.matters_from.filter((item2: any) => {
          return item2.matters_id == item.id
        })
        self.data.matters.push(item)
      })
    }
    self.data.handCase = newVal
  }
  @Watch('height', { deep: true, immediate: true })
  heightChangeVal(newVal: number, oldVal: number) {
    this.data.height = newVal
  }
  // data
  data: any = {
    handCase: {}, //父组件传过来的数据
    height: 0, //侧边栏高度
    matters: [], //进程
    courtType: [
      { label: '法院名称', prop: 'court_name' },
      { label: '法庭名称', prop: 'tribunal_name' },
      { label: '法官姓名', prop: 'judge_name' },
      { label: '联系电话', prop: 'telephone' }
    ],
    matterType: [
      { label: '流程名称', prop: 'from_name' },
      { label: '执行状态', prop: 'execution_status' },
      { label: '计划执行时间', prop: 'estimated_time' },
      { label: '完成时间', prop: 'completion_time' }
    ],
    infoData: [], //进度详情
    dialogVisible: false //详情弹窗
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
  //法庭详情
  courtInfo(data: any) {
    // eslint-disable-next-line no-console
    console.log(data)
  }
  //事项详情
  matterInfo(data: any) {
    Api.getCaseFormInfo(data.row.id).then((res: any) => {
      this.data.dialogVisible = true
      this.data.infoData = res.data
    })
  }
  //图片预览
  preview(url: string) {
    window.open(url)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.handCase-wrap {
  width: 100%;
  overflow-y: auto;
  & > .section {
    margin-bottom: 20px;
    padding-right: 20px;
    & > span:first-child {
      margin-top: 10px;
      display: block;
      height: 20px;
      .edit {
        color: #e6a23c;
        float: right;
        cursor: pointer;
      }
      .add {
        color: #67c23a;
        float: right;
        cursor: pointer;
      }
    }
    .title {
      font-size: 12px;
      margin: 10px 0;
      color: #303133;
    }
    .box {
      display: flex;
      flex-wrap: wrap;
      & > .text {
        width: 33.33%;
        p {
          color: $General-colors;
          font-size: 14px;
          margin: 0;
          margin-bottom: 10px;
          line-height: 32px;
          display: flex;
          & > span:first-child {
            margin-right: 20px;
            font-size: 12px;
            color: $Secondary-text;
            min-width: 60px;
          }
        }
      }
      & > .el-row {
        width: 100%;
        height: 32px;
        line-height: 32px;
        margin-bottom: 10px;
        span {
          color: #909199;
          font-size: 12px;
        }
        p {
          margin: 0;
          font-size: 14px;
          color: #313133;
        }
      }
    }
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .generate {
    color: white;
    float: right;
    cursor: pointer;
    background: #ec193a;
    padding: 4px 8px;
    border-radius: 2px;
  }
  & .cell {
    & button:nth-child(2) {
      display: none;
    }
  }
  .title {
    font-size: 14px;
    color: #606266;
    font-weight: bold;
    display: inline-block;
    border-left: 3px solid #e01f3c;
    height: 15px;
    line-height: 15px;
    padding-left: 10px;
  }
  & .el-step__title.is-success {
    color: #313133;
  }
  & .el-step__description.is-success {
    font-size: 14px;
    min-height: 40px;
    margin-bottom: 20px;
    color: #606266;
  }
}
</style>
