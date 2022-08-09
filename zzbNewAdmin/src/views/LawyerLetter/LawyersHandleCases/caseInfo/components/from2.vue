<template>
  <div class="from1-wrap">
    <el-form ref="form" :model="data.form" label-width="130px">
      <el-form-item label="请款币种">
        <el-select
          size="small"
          v-model="data.form.request_currency_id"
          placeholder="请款币种"
        >
          <el-option
            v-for="(item, index) in data.currencys"
            :key="index"
            :label="item.currency_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="固定服务费">
        <el-input size="small" v-model="data.form.fixed_service_fee"></el-input>
      </el-form-item>
      <el-form-item label="发票类型">
        <el-select
          size="small"
          v-model="data.form.invoice_type"
          placeholder="请选择发票类型"
          @change="invoiceChange"
        >
          <el-option
            v-for="(item, index) in data.invoiceTypes"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发票类型税率">
        <el-input
          style="width:100px;"
          size="small"
          v-model="data.form.invoice_tax_rate"
        ></el-input>
        <span> %</span>
      </el-form-item>
      <!-- <div v-if="Entrust_type == 'Entrust_type_6'"> -->
      <el-form-item
        v-show="
          data.settlement.quoted_price.platform_management_fee_type == '0'
        "
        label="原平台管理费额"
      >
        <span>{{ data.form.old_management_rate }}</span>
      </el-form-item>
      <el-form-item
        v-show="
          data.settlement.quoted_price.platform_management_fee_type == '1'
        "
        label="原平台管理费率"
      >
        <span>{{ data.form.old_management_rate }} %</span>
      </el-form-item>
      <el-form-item
        v-show="
          data.settlement.quoted_price.platform_management_fee_type == '1'
        "
        label="最终平台管理费率"
      >
        <el-input
          style="width:100px;"
          size="small"
          v-model="data.form.new_management_rate"
        ></el-input>
        <span> %</span>
      </el-form-item>
      <el-form-item label="最终平台管理费额">
        <el-input
          style="width:100px;"
          size="small"
          v-model="data.form.management_fee"
        ></el-input>
        <el-select
          style="width:100px;margin-left:20px;"
          size="small"
          v-model="data.form.management_currency_id"
          placeholder="请选择平台管理费币种"
        >
          <el-option
            v-for="(item, index) in data.currencys"
            :key="index"
            :label="item.currency_name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-button
          v-show="
            data.settlement.quoted_price.platform_management_fee_type == '1'
          "
          style="margin-left:20px;"
          @click="calculation1"
          size="small"
          type="primary"
          >重新计算</el-button
        >
      </el-form-item>
      <!-- </div> -->
      <!-- <div v-if="Entrust_type == 'Entrust_type_5'">
        <el-form-item label="原平台服务费额">
          <span>{{ data.form.old_management_rate }}</span>
        </el-form-item>
        <el-form-item label="最终平台服务费额">
          <el-input
            style="width:100px;"
            size="small"
            v-model="data.form.management_fee"
          ></el-input>
          <el-select
            style="width:100px;margin-left:20px;"
            size="small"
            v-model="data.form.management_currency_id"
            placeholder="请选择平台服务费币种"
          >
            <el-option
              v-for="(item, index) in data.currencys"
              :key="index"
              :label="item.currency_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </div> -->
      <el-form-item
        v-show="radio == 0"
        :label="
          Entrust_type == 'Entrust_type_5'
            ? '最终应付服务费费'
            : '最终应付律师费'
        "
      >
        <el-input
          style="width:100px;"
          size="small"
          v-model="data.form.lawyer_fee"
        ></el-input>
        <el-select
          style="width:100px;margin-left:20px;"
          size="small"
          v-model="data.form.lawyer_fee_currency_id"
          :placeholder="
            Entrust_type == 'Entrust_type_5'
              ? '请选择应付服务费币种'
              : '请选择应付律师费币种'
          "
        >
          <el-option
            v-for="(item, index) in data.currencys"
            :key="index"
            :label="item.currency_name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-button
          style="margin-left:20px;"
          @click="calculation2"
          size="small"
          type="primary"
          >重新计算</el-button
        >
      </el-form-item>
      <el-form-item label="账单备注">
        <el-input
          size="small"
          type="textarea"
          :rows="6"
          v-model="data.form.bill_remarks"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="quxiao">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import * as Api from '../../../../../api/business'

@Component({})
export default class About extends Vue {
  // data
  data: any = {
    settlement: {},
    form: {
      id: '',
      business_type: '', //业务类别
      debtor_number: '', //债务人编号
      collection_currency_id: '', //回款币种
      collection_amount: '', //回款金额
      collection_mode: '', //回款方式
      collection_date: '', //回款日期
      collection_remarks: '', //回款备注
      request_currency_id: 1, //请款币种
      fixed_service_fee: '', //固定服务费
      invoice_type: 'Invoice_Type_0', //发票类型
      invoice_tax_rate: '1', // 发票类型税率
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
    currencys: [], //币种下拉
    invoiceTypes: [
      { value: 'Invoice_Type_0', name: '增值税普通发票（电子）', taxRate: '1' },
      { value: 'Invoice_Type_3', name: '增值税专用发票（电子）', taxRate: '6' },
      { value: 'Invoice_Type_1', name: '增值税普通发票（纸质）', taxRate: '3' },
      { value: 'Invoice_Type_2', name: '增值税专用发票（纸质）', taxRate: '6' }
    ] //发票类型下拉
  }
  labelWidth: string = '80px'
  @Prop({}) public rate: any
  @Prop({}) public radio: any
  @Prop({}) public editData: any
  @Prop({}) settlement!: any
  @Prop({}) public Entrust_type!: string
  @Watch('rate', { immediate: true })
  rateChangeValue(newVal: any, oldVal: any) {
    this.data.form.old_management_rate = newVal
  }
  @Watch('settlement', { deep: true, immediate: true })
  settlementVal(newVal: any, oldVal: any) {
    this.data.settlement = newVal
    if (
      this.data.form.management_fee == '' &&
      this.data.settlement.quoted_price.platform_management_fee_type == '0'
    ) {
      this.data.form.management_fee = this.rate
    }
    if (
      this.data.form.new_management_rate == '' &&
      this.data.settlement.quoted_price.platform_management_fee_type == '1'
    ) {
      this.data.form.new_management_rate = this.rate
    }
  }
  @Watch('editData', { deep: true, immediate: true })
  editDataChangeValue(newVal: any, oldVal: any) {
    if (JSON.stringify(newVal) != '{}') {
      let data: any = this.data.form
      let editData: any = JSON.parse(JSON.stringify(newVal))
      Object.keys(data).forEach((key: string) => {
        if (editData[key]) {
          data[key] = editData[key]
        }
      })
    } else {
      this.data.form = {
        id: '',
        business_type: '', //业务类别
        debtor_number: '', //债务人编号
        collection_currency_id: '', //回款币种
        collection_amount: '', //回款金额
        collection_mode: '', //回款方式
        collection_date: '', //回款日期
        collection_remarks: '', //回款备注
        request_currency_id: 1, //请款币种
        fixed_service_fee: '', //固定服务费
        invoice_type: 'Invoice_Type_0', //发票类型
        invoice_tax_rate: '1', // 发票类型税率
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
      }
      this.data.form.old_management_rate = this.rate
      if (
        this.data.form.management_fee == '' &&
        this.data.settlement.quoted_price.platform_management_fee_type == '0'
      ) {
        this.data.form.management_fee = this.rate
      }
      if (
        this.data.form.new_management_rate == '' &&
        this.data.settlement.quoted_price.platform_management_fee_type == '1'
      ) {
        this.data.form.new_management_rate = this.rate
      }
      if (this.data.settlement.quoted_price.customer_select == 0) {
        //纯固定
        this.data.form.fixed_service_fee = this.data.settlement.quoted_price.fixed_service_fee
      }
      if (this.data.settlement.quoted_price.customer_select == 2) {
        //固定+风险
        this.data.form.fixed_service_fee = this.data.settlement.quoted_price.fixed_risk_service_fee_fixed
      }
    }
  }
  created() {
    let self: any = this
    self.getCurrencys()
  }

  activated() {
    //
  }

  mounted() {
    // if (this.data.settlement.quoted_price.customer_select == 0) {
    //   //纯固定
    //   this.data.form.fixed_service_fee = this.data.settlement.quoted_price.fixed_service_fee
    // }
    // if (this.data.settlement.quoted_price.customer_select == 2) {
    //   //固定+风险
    //   this.data.form.fixed_service_fee = this.data.settlement.quoted_price.fixed_risk_service_fee_fixed
    // }
  }
  //获取币种下拉
  getCurrencys() {
    Api.getCurrency().then((res: any) => {
      this.data.currencys = res.data
    })
  }
  //发票类型选择
  invoiceChange(val: any) {
    let data: any = this.data.invoiceTypes.filter((item: any) => {
      return item.value == val
    })
    this.data.form.invoice_tax_rate = data[0].taxRate
  }
  //提交
  onSubmit() {
    this.$emit('onSubmit', this.data.form)
  }
  //取消
  quxiao() {
    this.$emit('close')
  }
  //计算金额1
  calculation1() {
    const principal: number = this.data.form.fixed_service_fee //固定服务费
    const rate: number =
      this.data.form.new_management_rate || this.data.form.old_management_rate
    this.data.form.management_fee = principal * (rate * 0.01)
  }
  //计算金额2
  calculation2() {
    const amount: number = this.data.form.fixed_service_fee //固定服务费
    const amount2: number = this.data.form.management_fee //平台管理费
    this.data.form.lawyer_fee = amount - amount2
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.from1-wrap {
  width: 100%;
}
</style>
