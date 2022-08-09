<template>
  <div :style="{ height: data.height + 'px' }" class="settlement-wrap">
    <div class="section">
      <span style="margin-top:0;">
        <span class="title">请款对象</span>
      </span>
      <el-divider></el-divider>
      <el-radio-group @change="radioChange" v-model="data.radio">
        <el-radio :label="0">用户</el-radio>
        <el-radio :label="1">律所</el-radio>
      </el-radio-group>
    </div>
    <div v-for="(item, index) in data.tabList" class="section" :key="index">
      <span style="margin-top:0;">
        <span class="title">{{ item.title }}</span>
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-circle-plus-outline"
          @click="application(item)"
          class="generate"
          >{{ item.generate }}</el-button
        >
      </span>
      <el-divider></el-divider>
      <comTab4
        :Entrust_type="item.Entrust_type"
        :tableData="item.list"
        :tableType="item.option"
        @Delete="collectionDel"
        @Related="Related"
        @info="e => collectionEdit(e, item.generate)"
      ></comTab4>
    </div>
    <div>
      <el-button
        size="small"
        @click="goAddBill(0)"
        v-show="data.radio == 0"
        type="primary"
        >生成法律服务费请款单</el-button
      >
      <el-button
        size="small"
        @click="goAddBill(1)"
        v-show="data.radio == 0"
        type="primary"
        >生成律师费请款单</el-button
      >
      <el-button
        size="small"
        @click="goAddBill(2)"
        v-show="data.radio == 1"
        type="primary"
        >生成平台管理费请款单</el-button
      >
    </div>
    <el-dialog
      :title="data.title"
      :visible.sync="dialogVisible"
      :before-close="
        () => {
          dialogVisible = false
        }
      "
    >
      <form2
        v-if="this.data.title == '新增固定服务费请款'"
        :rate="rate"
        :settlement="data.settlement"
        :radio="data.radio"
        :editData="data.editData"
        :Entrust_type="Entrust_type"
        @onSubmit="onSubmit"
        @close="quxiao"
      ></form2>
      <form3
        v-if="this.data.title == '新增风险服务费请款'"
        :rate="rate2"
        :radio="data.radio"
        :settlement="data.settlement"
        :editData="data.editData"
        @onSubmit="onSubmit"
        @close="quxiao"
      ></form3>
    </el-dialog>
    <el-dialog
      title="关联账单"
      :visible.sync="dialogVisible2"
      :before-close="
        () => {
          dialogVisible2 = false
          data.RelatedData.bill_number = ''
        }
      "
    >
      <el-table
        border
        ref="multipleTable"
        :data="data.selectList"
        style="width: 100%"
      >
        <el-table-column prop="id" label="请款ID" width="80"> </el-table-column>
        <el-table-column prop="bill_number_1" label="账单编号">
        </el-table-column>
        <el-table-column label="选择" width="120">
          <template slot-scope="scope">
            <el-radio
              v-model="data.RelatedData.bill_number"
              :label="scope.row.bill_number_1"
              >选中</el-radio
            >
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            dialogVisible2 = false
            data.RelatedData.bill_number = ''
          "
          >取 消</el-button
        >
        <el-button type="primary" @click="slelectQr">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import comTab4 from './table4.vue'
import { OptionDatas, SetData } from './settlement'
import * as Api from '../../../../../api/business'
import * as Api2 from '../../../../../api/finance'
import form2 from './from2.vue'
import form3 from './from3.vue'
import { filter } from 'vue/types/umd'
import { thousandBitSeparator } from '../../../../../utils/common'
@Component({
  components: {
    comTab4,
    form2,
    form3
  }
})
export default class About extends Vue {
  // prop
  @Prop({ required: false, default: '' }) settlement!: any
  @Prop() height!: number
  //Watch
  @Watch('settlement', { deep: true })
  settlementChangeVal(newVal: any, oldVal: any) {
    if (newVal != '') {
      this.data.settlement = JSON.parse(JSON.stringify(newVal))
      this.data.service_fee_mode = newVal.case_detail.customer_select
      this.data.radio =
        newVal.case_detail.payment_request_object == 0
          ? 0
          : newVal.case_detail.payment_request_object == 1
          ? 0
          : 1
      this.PageRender()
    }
  }
  @Watch('height', { deep: true, immediate: true })
  heightChangeVal(newVal: number, oldVal: number) {
    this.data.height = newVal
  }
  @Watch('OptionDatas', { deep: true })
  // data
  data: any = {
    settlement: {}, //父组件传过来的数据
    height: 0, //侧边栏高度
    radio: 0, //用户发起还是律所发起
    //整合之后的数据
    tabList: [],
    RelatedData: {
      //关联参数
      pay_case_id: '',
      bill_number: ''
    },
    selectList: [], //关联数据
    title: '',
    service_fee_mode: '', //服务费模式
    form: {
      id: '',
      business_type: '', //业务类别
      debtor_number: '', //债务人编号
      collection_currency_id: '', //回款币种
      collection_amount: '', //回款金额
      collection_mode: '', //回款方式
      collection_date: '', //回款日期
      collection_remarks: '', //回款备注
      request_currency_id: '', //请款币种
      fixed_service_fee: '', //固定服务费
      invoice_type: '', //发票类型
      invoice_tax_rate: '', // 发票类型税率
      float_service_rate: '', //风险服务费
      float_service_fee_currency_id: 1, //风险服务费额_币种
      float_service_fee: '', //风险服务费额
      old_management_rate: '', //原平台管理费率
      new_management_rate: '', //最终平台管理费率
      management_currency_id: 1, //平台管理费额_币种
      management_fee: '', //平台管理费额
      lawyer_fee_currency_id: 1, //最终应付律师费_币种
      lawyer_fee: '', //最终应付律师费
      bill_remarks: '' //账单备注
    },
    editData: {}
  }
  dialogVisible: boolean = false
  dialogVisible2: boolean = false
  rate: any = ''
  Entrust_type: string = ''
  rate2: any = ''
  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    //
  }
  //回款记录删除
  collectionDel(data: any) {
    Api2.DeleteCaseFinanceById(data.row.id).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.$emit('init')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //请款对象改变
  radioChange(val: number) {
    let parmas: any = {
      debtor_number: this.data.settlement.case_detail.debtor_number,
      object_type: val + 1
    }
    Api2.UpdateRequestObject(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.PageRender()
      } else {
        if (val == 0) {
          this.data.radio = 1
        }
        if (val == 1) {
          this.data.radio = 0
        }
        this.$message.warning(res.msg)
      }
    })
  }
  //渲染
  PageRender() {
    const service_fee_mode: number = this.data.settlement.quoted_price
      .customer_select //服务费模式
    const res: any = JSON.parse(
      JSON.stringify(this.data.settlement.request_record)
    )
    const radio: number = this.data.radio //请款目标 0:用户 1:律所

    res.forEach((item: any) => {
      let val: any = item.create_time.replace('T', ' ')
      item.create_time = val.substring(0, 16)
      item.float_service_rate = item.float_service_rate + '%'
      item.new_management_rate = item.new_management_rate + '%'
      item.collection_amount = `${item.currency_1} ${thousandBitSeparator(
        item.collection_amount
      )}`
      item.fixed_service_fee = `${item.currency_2} ${thousandBitSeparator(
        item.fixed_service_fee
      )}`
      item.float_service_fee = `${item.currency_3} ${thousandBitSeparator(
        item.float_service_fee
      )}`
      item.management_fee = `${item.currency_4} ${thousandBitSeparator(
        item.management_fee
      )}`
      item.lawyer_fee = `${item.currency_5} ${thousandBitSeparator(
        item.lawyer_fee
      )}`
    })
    if (radio === 0) {
      if (service_fee_mode === 1) {
        //纯风险
        SetData('UserFloat', res)
        this.data.tabList = OptionDatas.UserFloat
      } else if (service_fee_mode === 0) {
        //纯固定
        SetData('UserFixed', res)
        this.data.tabList = OptionDatas.UserFixed
      } else {
        //固定 + 风险
        SetData('UserFixedFloat', res)
        this.data.tabList = OptionDatas.UserFixedFloat
      }
    } else {
      if (service_fee_mode === 1) {
        //纯风险
        SetData('lawyerFloat', res)
        this.data.tabList = OptionDatas.lawyerFloat
      } else if (service_fee_mode === 0) {
        //纯固定
        SetData('lawyerFixed', res)
        this.data.tabList = OptionDatas.lawyerFixed
      } else {
        //固定 + 风险
        SetData('lawyerFixedFloat', res)
        this.data.tabList = OptionDatas.lawyerFixedFloat
      }
    }
  }
  //打开新增请款弹窗
  application(item: any) {
    this.data.title = item.generate
    this.data.form.debtor_number = this.data.settlement.quoted_price.debtor_number
    this.data.form.business_type = item.Entrust_type
    this.data.editData = {}
    let quoted_price: any = this.data.settlement.quoted_price
    if (quoted_price.customer_select == 1) {
      //纯风险
      this.rate2 = quoted_price.platform_management_risk_fee + '%'
    } else if (quoted_price.customer_select == 0) {
      //纯固定
      // if (item.Entrust_type == 'Entrust_type_6') {
      this.rate =
        quoted_price.platform_management_fee_type == '0'
          ? quoted_price.platform_management_fixed_fee
          : quoted_price.platform_management_fixed_fee_percentage
      // } else if (item.Entrust_type == 'Entrust_type_5') {
      //   this.rate = quoted_price.fixed_service_fee
      // } else {
      //   this.rate = quoted_price.fixed_risk_service_fee_fixed
      // }
      this.Entrust_type = item.Entrust_type
    } else {
      this.rate =
        quoted_price.platform_management_fee_type == '0'
          ? quoted_price.platform_management_fixed_fee
          : quoted_price.platform_management_fixed_fee_percentage
      this.rate2 = quoted_price.platform_management_risk_fee + '%'
    }

    this.dialogVisible = true
  }
  //回款记录编辑
  collectionEdit(data: any, name: string) {
    const arr: any = this.data.settlement.request_record.filter((item: any) => {
      return item.id === data.row.id
    })
    this.data.editData = Object.assign({}, arr[0])
    this.data.title = name
    let quoted_price: any = this.data.settlement.quoted_price
    if (quoted_price.customer_select == 1) {
      //纯风险
      this.rate2 = quoted_price.platform_management_risk_fee + '%'
    } else if (quoted_price.customer_select == 0) {
      //纯固定
      this.rate = quoted_price.platform_management_fixed_fee
    } else {
      this.rate = quoted_price.platform_management_fixed_fee
      this.rate2 = quoted_price.platform_management_risk_fee + '%'
    }
    this.dialogVisible = true
  }
  //新增、编辑确定
  onSubmit(res: any) {
    let parmas: any = this.data.form
    Object.keys(parmas).forEach((key: string) => {
      if (res[key]) {
        parmas[key] = res[key]
      }
    })
    Api2.AddCaseFinance(parmas).then((res: any) => {
      if (res.state) {
        this.dialogVisible = false
        this.$emit('init')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //弹窗关闭
  quxiao() {
    this.dialogVisible = false
  }
  //生成账单
  goAddBill(num: number) {
    const self: any = this
    let parmas: any = {}
    if (num == 0) {
      parmas['type'] = 0
      parmas['debtor_number'] = this.data.settlement.quoted_price.debtor_number
      parmas['member_id'] = this.data.settlement.case_detail.member_id
      // if (
      //   this.data.tabList[0].list.length != 0
      //    || this.data.tabList[1].list.length != 0
      //    ||  this.data.tabList[2].list.length != 0
      // ) {
      //   this.$message.warning('请先新增请款')
      //   return false
      // }
      self.$router.push({
        path: '/business/listbill/ailist',
        query: parmas
      })
    } else if (num == 1) {
      parmas['type'] = num
      parmas['debtor_number'] = this.data.settlement.quoted_price.debtor_number
      parmas['member_id'] = this.data.settlement.case_detail.lawyer_member_id
      parmas['lawyer_id'] = this.data.settlement.case_detail.lawyer_id
      // if (
      //   // this.data.tabList[1].list.length == 0 &&
      //   this.data.tabList[0].list.length == 0
      // ) {
      //   this.$message.warning('请先新增请款')
      //   return false
      // }
      self.$router.push({
        path: '/business/listbill/ailist',
        query: parmas
      })
    } else {
      parmas['type'] = num
      parmas['debtor_number'] = this.data.settlement.quoted_price.debtor_number
      parmas['member_id'] = this.data.settlement.case_detail.lawyer_member_id
      parmas['lawyer_id'] = this.data.settlement.case_detail.lawyer_id
      // if (this.data.tabList[0].list.length == 0) {
      //   this.$message.warning('请先新增请款')
      //   return false
      // }
      self.$router.push({
        path: '/business/listbill/ailist',
        query: parmas
      })
    }
  }
  //关联账单
  Related(id: number) {
    let row: any = this.data.tabList[0].list.filter((item: any) => {
      return item.bill_number_1 != null && item.bill_number_1 != ''
    })
    if (row.length == 0) {
      this.$message.warning('暂无可关联的账单')
      return false
    }
    this.data.RelatedData.pay_case_id = id
    this.data.selectList = row
    this.dialogVisible2 = true
  }

  //关联确认
  slelectQr() {
    if (this.data.RelatedData.bill_number == '') {
      this.$message.warning('请选则要关联的账单')
      return false
    }
    let parmas: any = Object.assign({}, this.data.RelatedData)
    parmas.bill_number = parmas.bill_number.substring(
      0,
      parmas.bill_number.lastIndexOf('（')
    )
    Api2.RelationBill(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.data.RelatedData.bill_number = ''
        this.dialogVisible2 = false
        this.$emit('init')
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.settlement-wrap {
  width: 100%;
  overflow-y: auto;
  & > .section {
    margin-bottom: 20px;
    padding-right: 20px;
    & > span:first-child {
      font-size: 12px;
      color: $Main-characters;
      margin-top: 10px;
      display: block;
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
          margin: 0;
          margin-bottom: 10px;
          display: flex;
          height: 20px;
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
    // color: white;
    float: right;
    // cursor: pointer;
    // background: #ec193a;
    // padding: 4px 8px;
    // border-radius: 2px;
    position: relative;
    top: -5px;
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
  & .el-dialog {
    & .el-form {
      & .el-form-item {
        margin-bottom: 10px;
      }
      & .el-input {
        // width: 280px;
        max-width: 210px;
      }
    }
    & .el-dialog__body {
      padding-top: 0 !important;
    }
    & .el-dialog__footer {
      text-align: center;
    }
  }
}
</style>
