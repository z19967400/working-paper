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
        :name="'法院信息'"
      ></comTab1>
    </div>
    <div v-for="(item, index) in data.matters" :key="index" class="section">
      <span style="margin-top:0;position: relative;">
        <span class="title">{{ item.matters_name }}</span>
        <el-button
          size="mini"
          style="position: absolute;right:0px;"
          icon="el-icon-circle-plus-outline"
          type="primary"
          @click="openAddMatters(item.id)"
          v-show="
            item.unexecuted_tasks_count > 0 || item.progress_tasks_count > 0
          "
          >新增办案流程</el-button
        >
      </span>
      <el-divider></el-divider>
      <comTab1
        :tableData="item.list"
        :tableType="data.matterType"
        :index="index"
        @info="matterInfo"
        @Delete="listDelete"
      ></comTab1>
    </div>
    <el-button
      size="mini"
      icon="el-icon-circle-plus-outline"
      type="primary"
      @click="data.dialogVisible3 = true"
      >新增/编辑办案事项</el-button
    >
    <el-dialog title="案件详情" :visible.sync="data.dialogVisible">
      <el-row
        style="display:flex;margin-bottom:20px;"
        v-for="(item, index) in data.infoData"
        :key="index"
      >
        <span style="min-width:160px;white-space:normal;width: 160px;">{{
          item.name
        }}</span>
        <div style="margin-left:20px;">
          <span
            v-if="
              item.control_type != 'Control_type_9' &&
                item.control_type != 'Control_type_8'
            "
            >{{ item.form_value || '暂无' }}</span
          >
          <el-image
            v-if="item.control_type == 'Control_type_8'"
            :src="item.form_value"
            :preview-src-list="data.srcList"
            style="width:120px;"
          >
          </el-image>

          <div v-if="item.control_type == 'Control_type_9'">
            <el-image
              v-for="(item2, index2) in item.form_value.split(',')"
              :src="item2"
              :preview-src-list="data.srcList"
              style="margin-right:20px;width:120px;"
              :key="index2"
            >
            </el-image>
          </div>
        </div>
      </el-row>
      <el-button
        style="display:block;margin:auto;width:120px;margin-top:40px;"
        plain
        type="primary"
        @click="data.dialogVisible = false"
        >关闭</el-button
      >
    </el-dialog>
    <!-- 新增办案流程 !-->
    <el-dialog
      title="新增办案流程"
      class="small"
      :visible.sync="data.dialogVisible2"
    >
      <el-row style="line-height: 32px;">
        <el-col :span="4">
          流程名称
        </el-col>
        <el-col :span="16">
          <el-select v-model="data.addMatter.from_id" size="small">
            <el-option
              v-for="(item, index) in data.MattersFromList"
              :key="index"
              :label="item.form_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px;line-height: 32px;">
        <el-col :span="4">
          间隔天数
        </el-col>
        <el-col :span="16">
          <el-input
            style="width:215px;"
            v-model="data.addMatter.interval_days"
            size="small"
          ></el-input>
        </el-col>
      </el-row>
      <div style="text-align:center;margin-top:40px;">
        <el-button>取消</el-button>
        <el-button @click="AddCaseMattersFrom" type="primary">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="办案事项" :visible.sync="data.dialogVisible3">
      <el-table v-loading="data.loading" border :data="data.matters">
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="流程名称" prop="matters_name">
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button
              :disabled="scope.row.up"
              style="color:#409EFF;"
              type="text"
              @click="CaseMattersSort(scope.row, 1)"
              >上移</el-button
            >
            <el-button
              :disabled="scope.row.down"
              @click="CaseMattersSort(scope.row, 2)"
              style="color:#409EFF;"
              type="text"
              >下移</el-button
            >
            <el-button
              :disabled="scope.row.delect"
              @click="matterDelect(scope.row)"
              type="text"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top:20px;">
        <el-col :span="9">
          <el-select
            size="small"
            v-model="data.matterId"
            placeholder="请选择办案事项"
          >
            <el-option
              v-for="item in data.MattersList"
              :key="item.value"
              :label="item.matters_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-button size="small" @click="AddCaseMatters" type="primary"
          >新增</el-button
        >
      </el-row>
      <!-- <div style="text-align:center;margin-top:20px;">
        <el-button type="primary">关闭</el-button>
      </div> -->
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
    loading: false,
    handCase: {}, //父组件传过来的数据
    height: 0, //侧边栏高度
    matters: [], //进程
    MattersList: [], //所有案件事项
    matterId: '', //新增事项ID
    MattersFromList: [], //所有案件流程
    srcList: [],
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
    dialogVisible: false, //详情弹窗
    dialogVisible2: false, //新增办案流程弹窗
    dialogVisible3: false, //新增办案事项弹窗
    addMatter: {
      //新增办案流程数据
      matters_id: 0,
      from_id: '',
      interval_days: '', //间隔天数
      debtor_number: '' //委托编号
    }
  }
  created() {
    this.getAllmaters()
    this.GetAllCaseMattersFrom()
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
      res.data.forEach((item: any) => {
        if (item.control_type === 'Control_type_9') {
          this.data.srcList = item.form_value.split(',')
        }
        if (item.control_type === 'Control_type_8') {
          this.data.srcList = [item.form_value]
        }
      })
    })
  }
  //图片预览
  preview(url: string) {
    window.open(url)
  }
  //获取所有案件事项
  getAllmaters() {
    Api.getAllMatters().then((res: any) => {
      if (res.state) {
        this.data.MattersList = res.data
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //获取所有案件流程
  GetAllCaseMattersFrom() {
    Api.GetAllCaseMattersFrom().then((res: any) => {
      if (res.state) {
        this.data.MattersFromList = res.data
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //新增案件事项流程
  AddCaseMattersFrom() {
    Api.AddCaseMattersFrom(this.data.addMatter).then((res: any) => {
      if (res.state) {
        this.$message.success(res.mg)
        this.data.dialogVisible2 = false
        this.$emit('init')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //删除事项流程
  listDelete(data: any) {
    let self: any = this
    let parmas: any = {
      id: data.row.id,
      debtor_number: self.$route.params.number
    }
    Api.DeleteCaseMattersFromById(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.$emit('init')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }

  //打开新增案件事项流程弹窗
  openAddMatters(id: string) {
    let self: any = this
    self.data.dialogVisible2 = true
    self.data.addMatter.matters_id = id
    self.data.addMatter.debtor_number = self.$route.params.number
  }
  //删除案件事项
  matterDelect(parmas: any) {
    let self: any = this
    self
      .$confirm('您确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        let data: any = {
          id: parmas.id,
          debtor_number: self.$route.params.number
        }
        self.data.loading = true
        Api.DeleteCaseMattersById(data).then((res: any) => {
          if (res.state) {
            this.$message.success(res.msg)
            this.$emit('init')
          } else {
            this.$message.warning(res.msg)
          }
          setTimeout(() => {
            self.data.loading = false
          }, 1000)
        })
      })
      .catch(() => {
        self.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }

  //新增案件事项
  AddCaseMatters() {
    let self: any = this
    self.data.loading = true
    let parmas: any = {
      id: self.data.matterId,
      debtor_number: self.$route.params.number
    }
    Api.AddCaseMatters(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.$emit('init')
      } else {
        this.$message.warning(res.msg)
      }
      setTimeout(() => {
        self.data.loading = false
      }, 1000)
    })
  }
  //事项排序
  CaseMattersSort(row: any, type: number) {
    let self: any = this
    self.data.loading = true
    let parmas: any = {
      id: row.id,
      type,
      debtor_number: self.$route.params.number
    }
    Api.CaseMattersSort(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.$emit('init')
      } else {
        this.$message.warning(res.msg)
      }
      setTimeout(() => {
        self.data.loading = false
      }, 1000)
    })
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
    // & button:nth-child(2) {
    //   display: none;
    // }
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
  & .el-button.is-disabled {
    color: #c0c4cc !important;
  }
}
</style>
