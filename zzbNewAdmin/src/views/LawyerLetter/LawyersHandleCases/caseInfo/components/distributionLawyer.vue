<template>
  <div :style="{ height: data.height + 'px' }" class="distributionLawyer-wrap">
    <div class="section">
      <span style="margin-top:0;">
        <span class="title">分配律师</span>
        <span @click="generate" class="generate">案件派单</span>
      </span>
      <el-divider></el-divider>
      <comTab2
        :tableData="data.distributionLawyer.tabData"
        :tableType="data.distributionLawyer.tabOption"
        @revoke="revoke"
        @distribution="distribution"
      ></comTab2>
    </div>
    <el-dialog class="dialog" title="案件派单" :visible.sync="dialogVisible">
      <el-row>
        <span>律师库</span>
        <el-select
          @change="hanldChange"
          style="width:120px;margin:0 20px;"
          size="small"
          v-model="data.value"
          placeholder="请选择律师库"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-radio-group
          @change="radioChange"
          style="width:280px;"
          v-model="data.address"
        >
          <el-radio
            v-for="(item, index) in address"
            :key="index"
            :label="item"
            >{{ item }}</el-radio
          >
        </el-radio-group>
      </el-row>
      <el-row style="line-height:40px;height:40px;margin-top:20px;">
        <el-col :span="16">
          <span
            >小程序案件链接：https://h5.debteehelper.com/wechat/{{
              data.debtor_number
            }}
          </span>
          <span>（已打开{{ data.num }}次）</span>
        </el-col>
        <el-col :span="8" style="text-align: right;">
          <el-button size="small" @click="openSand" plain type="primary"
            >短信通知测试</el-button
          >
          <el-button size="small" @click="openSand2" plain type="primary"
            >批量短信通知</el-button
          >
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <div class="distribute">
        <el-table
          :data="data.list"
          v-loading="data.loading"
          style="width: 100%"
          height="450"
        >
          <el-table-column fixed prop="id" label="律师ID" width="80">
          </el-table-column>
          <el-table-column
            v-if="data.value === '平台律师'"
            prop="lawyer_name"
            label="律师姓名"
            width="120"
          >
          </el-table-column>
          <el-table-column v-else prop="name" label="律师姓名" width="120">
          </el-table-column>
          <el-table-column prop="law_firm_name" label="律所名称" width="180">
          </el-table-column>
          <el-table-column
            v-if="data.value === '平台律师'"
            prop="lawyer_phone_number"
            label="手机号"
            width="120"
          >
          </el-table-column>
          <el-table-column
            v-else
            prop="phone_number"
            label="手机号"
            width="120"
          >
          </el-table-column>
          <el-table-column
            v-if="data.value === '平台律师'"
            prop="law_firm_address_detailed"
            label="律所地址"
          >
          </el-table-column>
          <el-table-column v-else prop="address" label="律所地址">
          </el-table-column>
          <el-table-column
            v-if="data.value === '平台律师'"
            label="认证状态"
            width="120"
          >
            <template slot-scope="scope">
              <span>{{ statusTostr(scope.row['audit_status']) }}</span>
            </template>
          </el-table-column>
          <el-table-column v-else label="执业年限" width="100">
            <template slot-scope="scope">
              <span>{{ scope.row['career_years'] }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="60">
            <template slot-scope="scope">
              <el-button type="text" @click="tongzhi(scope.row)" size="small">
                通知
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="bottom-preve"
          @current-change="currentChange"
          :page-size="data.limit"
          :current-page="data.page"
          background
          layout="total, prev, pager, next"
          :total="data.count"
        >
        </el-pagination>
      </div>
    </el-dialog>
    <el-dialog
      class="dialog2"
      :title="data.title"
      :visible.sync="dialogVisible2"
    >
      <div class="sandSms-box">
        <div style="margin:30px 0 60px 0;text-align:center;">
          <p v-if="data.title === '批量短信通知'">
            已选择 {{ data.count }} 位律师 ,是否确认发送短信？
          </p>
          <el-input
            v-else
            v-model="data.phone"
            size="small"
            style="width:220px;"
            placeholder="请输入手机号"
          ></el-input>
        </div>
        <div class="sandSms-box-bottom">
          <el-button
            size="small"
            plain
            @click="dialogVisible2 = false"
            type="primary"
            >取消</el-button
          >
          <el-button size="small" @click="confirm" type="primary"
            >确认发送</el-button
          >
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import comTab2 from './table2.vue'
import * as Api from '../../../../../api/business'
import { api } from '../../../../../../../zzbPc/src/assets/js/api'
@Component({
  components: {
    comTab2
  }
})
export default class About extends Vue {
  // prop
  @Prop({ required: false, default: '' }) distributionLawyer!: any
  @Prop() height!: number
  @Prop() debtor_number!: number
  //Watch
  @Watch('distributionLawyer', { deep: true, immediate: true })
  distributionLawyerChangeVal(newVal: any, oldVal: any) {
    this.data.distributionLawyer = newVal
  }
  @Watch('height', { deep: true, immediate: true })
  heightChangeVal(newVal: number, oldVal: number) {
    this.data.height = newVal
  }
  @Watch('debtor_number', { deep: true, immediate: true })
  debtor_numberChangeVal(newVal: string, oldVal: string) {
    this.data.debtor_number = newVal
  }
  // data
  data: any = {
    distributionLawyer: {}, //父组件传过来的数据
    height: 0, //侧边栏高度
    debtor_number: '',
    list: [],
    value: '平台律师',
    address: '',
    num: 0,
    page: 1,
    limit: 50,
    count: 0,
    loading: false,
    title: '',
    phone: ''
  }
  options: any = [
    {
      value: '平台律师',
      label: '平台律师'
    },
    {
      value: '其他律师',
      label: '其他律师'
    }
  ]
  address: any = []
  dialogVisible: boolean = false
  dialogVisible2: boolean = false
  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    //
  }
  //分配
  distribution(data: any) {
    let parmas: any = {
      id: data.row.id,
      debtor_number: this.data.debtor_number
    }
    Api.distributionCase(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.$emit('init')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //撤销
  revoke(data: any) {
    let id: any = data.row.id
    Api.revokeDistribution(id).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.$emit('init')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //打开案件派单弹窗
  generate() {
    Api.GetCaseJurisdiction(this.data.debtor_number).then((res: any) => {
      if (res.data.province == '') {
        this.$message.warning('请先确定管辖地区')
        return false
      }
      this.dialogVisible = true
      this.address = [res.data.province, res.data.city, res.data.area]
      this.data.num = res.data.url_clicks_count
      this.data.address = res.data.province
      this.data.page = 1
      this.data.limit = 50
      this.init()
    })
  }
  init() {
    if (this.data.value === '平台律师') {
      this.getPinTaiLawyer()
    } else {
      this.getOtherLawyer()
    }
  }
  //获取平台律师分页数据
  getPinTaiLawyer() {
    this.data.loading = true
    let parmas: any = {
      page: this.data.page,
      limit: this.data.limit,
      id: 0,
      lawyer_name: '',
      lawyer_phone_number: '',
      address: this.data.address,
      audit_status: ''
    }
    Api.GetRegisterLawyerPagingData(parmas).then((res: any) => {
      this.data.list = res.data
      this.data.count = res.count
      this.data.loading = false
    })
  }
  //获取第三方律师库
  getOtherLawyer() {
    this.data.loading = true
    let parmas: any = {
      page: this.data.page,
      limit: this.data.limit,
      lawyer_name: '',
      lawyer_phone_number: '',
      address: this.data.address
    }
    Api.GetOtherLawyerPagingData(parmas).then((res: any) => {
      this.data.list = res.data
      this.data.count = res.count
      this.data.loading = false
    })
  }
  //通知
  tongzhi(row: any) {
    this.openSand()
    this.data.phone = row.phone_number || row.lawyer_phone_number
  }
  //认证状态转文本
  statusTostr(val: string) {
    let value: string = ''
    switch (val) {
      case 'Audit_states_0':
        value = '待认证'
        break
      case 'Audit_states_1':
        value = '未通过'
        break
      case 'Audit_states_2':
        value = '已通过'
        break
      default:
        break
    }
    return value
  }
  //律师库切换
  hanldChange(val: string) {
    this.data.page = 1
    this.data.limit = 50
    this.init()
  }
  //当前页切换
  currentChange(page: number) {
    this.data.page = page
    this.init()
  }
  //地区切换
  radioChange() {
    this.data.page = 1
    this.data.limit = 50
    this.init()
  }
  //打开短信通知弹窗
  openSand() {
    this.data.phone = ''
    this.data.title = '短信通知测试'
    this.dialogVisible2 = true
  }
  openSand2() {
    this.data.title = '批量短信通知'
    this.dialogVisible2 = true
  }
  //确认发送
  confirm() {
    const notice_type: number = this.data.title === '短信通知测试' ? 1 : 2
    let parmas: any = {
      notice_type,
      case_notice01: {},
      case_notice02: {}
    }
    if (notice_type === 1) {
      if (this.data.phone == '') {
        this.$message.warning('请输入要通知的手机号码')
        return false
      }
      parmas.case_notice01 = {
        debtor_number: this.data.debtor_number,
        phone_number: this.data.phone
      }
      this.sandNotice(parmas)
    } else {
      parmas.case_notice02 = {
        debtor_number: this.data.debtor_number,
        lawyer_type: this.data.value === '平台律师' ? 0 : 1,
        address: this.data.address
      }
      this.sandNotice(parmas)
    }
  }
  //发送通知
  sandNotice(parmas: any) {
    Api.ReceivingCaseNotice(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.dialogVisible2 = false
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.distributionLawyer-wrap {
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
        & > .select01 {
          width: 100px;
          margin-left: 10px;
        }
        & > .select02 {
          width: 100px;
          margin-left: 30px;
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
  & .dialog {
    & .el-dialog {
      width: 1080px !important;
    }
  }
  & .distribute {
    & > .bottom-preve {
      text-align: center;
      margin-top: 20px;
    }
  }
  & .dialog2 {
    & .el-dialog {
      width: 480px !important;
    }
    & .sandSms-box-bottom {
      text-align: center;
    }
  }
}
</style>
