<template>
  <div class="table4-wrap">
    <el-button
      class="addFeedback"
      @click="editClick(null)"
      style="color:#67C23A;float:right;"
      type="text"
      size="small"
      >新增债务反馈</el-button
    >
    <div class="table1-box">
      <el-table
        max-height="500"
        v-loading="loading"
        :data="data.list"
        border
        style="width: 100%"
        ref="moviesTable3"
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
              @click="editClick(scope.row)"
              class="edit"
              type="text"
              size="small"
              >编辑</el-button
            >
            <el-button
              @click="deleteClick(scope.row)"
              class="delete"
              type="text"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog width="35%" :visible.sync="data.feedbackType">
      <template slot="title">
        <span style="font-size:16px;">编辑/新增债务反馈</span>
        <span style="font-size:12px;color:#ec193a;margin-left:20px;"
          >该反馈将发送给用户</span
        >
      </template>
      <div class="info-box">
        <el-row>
          <el-col :span="4">
            <span class="label">委托编号</span>
          </el-col>
          <el-col :span="20">
            <el-select
              v-model="editData.debtor_number"
              placeholder="请选择委托编号"
            >
              <el-option
                v-for="item in obligorList"
                :key="item.debtor_number"
                :label="item.debtor_number"
                :value="item.debtor_number"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <span class="label">反馈来源</span>
          </el-col>
          <el-col :span="20">
            <el-radio-group v-model="editData.feedback_source">
              <el-radio :label="1">债务人提交</el-radio>
              <el-radio :label="2">客服添加</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <span class="label">是否有异议</span>
          </el-col>
          <el-col :span="20">
            <el-radio-group
              v-model="editData.is_dissent"
              @change="dissentChange"
            >
              <el-radio :label="0">无异议</el-radio>
              <el-radio :label="1">有异议</el-radio>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row v-show="editData.is_dissent != -1" style="margin-top:20px;">
          <el-col :span="4">
            <span class="label">异议内容</span>
          </el-col>
          <el-col :span="20">
            <el-checkbox-group v-model="editData.dissent_content">
              <el-checkbox v-if="editData.is_dissent == 1" label="债务不存在"
                >债务不存在</el-checkbox
              >
              <el-checkbox
                v-if="editData.is_dissent == 1"
                label="债务本身存有争议"
                >债务本身存有争议</el-checkbox
              >
              <el-checkbox v-if="editData.is_dissent == 1" label="金额有异议"
                >金额有异议</el-checkbox
              >
              <el-checkbox v-if="editData.is_dissent == 0" label="将尽快支付"
                >将尽快支付</el-checkbox
              >
              <el-checkbox
                v-if="editData.is_dissent == 0"
                label="请求分期付/还款"
                >请求分期付/还款</el-checkbox
              >
              <el-checkbox
                v-if="editData.is_dissent == 0"
                label="请求减免利息违约金"
                >请求减免利息违约金</el-checkbox
              >
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <span class="label">用户备注</span>
          </el-col>
          <el-col :span="16">
            <span style="font-size:12px;color:#ec193a;"
              >该备注将发送给用户</span
            >
            <el-input
              style="top:-15px;"
              type="textarea"
              v-model="editData.member_remarks"
            ></el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <span class="label">后台备注</span>
          </el-col>
          <el-col :span="16">
            <el-input
              type="textarea"
              v-model="editData.back_remarks"
            ></el-input>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import * as Api from '../../../../api/business'

@Component({})
export default class About extends Vue {
  // prop
  @Prop() tableData!: any
  @Prop() tableOption!: any
  @Prop() states!: string
  @Prop() obligorList!: any
  @Prop() loading!: boolean
  //Watch
  @Watch('tableData', { deep: true })
  tableDataChange(newVal: any, oldVal: any) {
    this.data.list = newVal
  }
  @Watch('states', { deep: true })
  statesChange(newVal: string, oldVal: string) {
    this.data.states = newVal
  }
  // data
  data: any = {
    list: [],
    states: '',
    feedbackType: false
  }
  editData: any = {
    id: 0, //大于0更新 等于0新增
    debtor_number: '', //债务人编号 委托编号
    feedback_source: 2, //反馈来源 1：债务人提交  2：管理员添加
    member_remarks: '', //用户备注
    is_dissent: 0, //是否有异议  0：无 1：有
    dissent_content: [], //异议内容 逗号分隔
    back_remarks: '' //后台备注
  }

  created() {
    this.$nextTick(() => {
      const moviesTable: any = this.$refs.moviesTable3
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
  editClick(row: any) {
    if (row == null) {
      this.editData = {
        id: 0, //大于0更新 等于0新增
        debtor_number: this.obligorList[0].debtor_number, //债务人编号 委托编号
        feedback_source: 2, //反馈来源 1：债务人提交  2：管理员添加
        member_remarks: '', //用户备注
        is_dissent: -1, //是否有异议  0：无 1：有
        dissent_content: [], //异议内容 逗号分隔
        back_remarks: '' //后台备注
      }
      this.data.feedbackType = true
      return false
    }
    let data: any = Object.assign({}, JSON.parse(JSON.stringify(row)))
    this.data.feedbackType = true
    Object.keys(this.editData).forEach((key: string) => {
      if (key == 'is_dissent') {
        this.editData[key] = data[key] == '有' ? 1 : 0
      } else if (key == 'dissent_content') {
        this.editData[key] = data[key].split(',')
      } else if (key == 'feedback_source') {
        this.editData[key] = data[key] == '债务人提交' ? 1 : 2
      } else {
        this.editData[key] = data[key]
      }
    })
  }
  //删除
  deleteClick(row: any) {
    this.$confirm('您确定删除该反馈吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        Api.DeleteDebtorFeedbackById(row.id).then((res: any) => {
          if (res.state) {
            this.$message({
              type: 'success',
              message: res.msg
            })
            this.$emit('init')
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
        })
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
  }
  //转字符串
  tostr(val: any) {
    if (val != null) {
      return val.toString()
    } else {
      return val
    }
  }
  //异议选择事件
  dissentChange(val: any) {
    this.editData.dissent_content = []
  }
  //取消编辑
  cancel() {
    this.editData = {
      id: 0, //大于0更新 等于0新增
      debtor_number: '', //债务人编号 委托编号
      feedback_source: 2, //反馈来源 1：债务人提交  2：管理员添加
      member_remarks: '', //用户备注
      is_dissent: 0, //是否有异议  0：无 1：有
      dissent_content: [], //异议内容 逗号分隔
      back_remarks: '' //后台备注
    }
    this.data.feedbackType = false
  }
  //确定编辑
  determine() {
    let self: any = this
    let str: string = ''
    let parmas: any = Object.assign(
      {},
      JSON.parse(JSON.stringify(self.editData))
    )
    if (parmas.dissent_content.length > 0) {
      parmas.dissent_content.forEach((item: any) => {
        str += item + ','
      })
    }
    parmas.dissent_content = str.substring(0, str.lastIndexOf(','))
    Api.UpdateFeedback(parmas).then((res: any) => {
      if (res.state) {
        self.data.feedbackType = false
        self.$message({
          type: 'success',
          message: res.msg
        })
        self.$emit('init')
      } else {
        self.$message({
          type: 'error',
          message: res.msg
        })
      }
    })
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

.table4-wrap {
  width: 100%;
  position: relative;
  .el-table th > .cell {
    text-align: center;
  }
  .el-table td > .cell div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
  .edit {
    color: #55a3f4;
  }
  .delete {
    color: #ec193a;
  }
  & .el-button.is-disabled {
    color: #c0c4cc !important;
  }
  & .el-row {
    line-height: 40px;
    margin-bottom: 10px;
  }
  & .label {
    // font-weight: bold;
    color: #303133;
    text-align: right;
    display: inline-block;
    width: 90%;
    height: 100%;
  }
  & .el-textarea__inner {
    height: 100px;
    position: relative;
    top: 10px;
  }
  & .addFeedback {
    position: absolute;
    top: -90px;
    right: 0;
  }
  & .dialog-footer {
    text-align: center;
  }
}
</style>
