<template>
  <div class="settlementInfo">
    <div class="scroll">
      <div
        v-show="billType == 'Bill_Type_0' && data.ai_pay.length > 0"
        class="table-cell"
      >
        <span>AI律师函服务</span>
        <el-table ref="multipleTable" :data="data.ai_pay" border>
          <el-table-column prop="pay_number" label="支付编号" width="150">
          </el-table-column>
          <el-table-column prop="debtor_number" label="委托编号" width="120">
          </el-table-column>
          <el-table-column prop="creditor_name" label="债权人" width="250">
          </el-table-column>
          <el-table-column prop="create_name" label="创建人" width="150">
          </el-table-column>
          <el-table-column prop="create_time" label="创建时间" width="150">
          </el-table-column>
          <el-table-column prop="total_amount" label="单价"> </el-table-column>
          <el-table-column prop="paid_amount" label="应付金额">
          </el-table-column>
          <el-table-column prop="bill_remarks" label="账单备注">
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                trigger="click"
                :content="tostr(scope.row.bill_remarks)"
                popper-class="table-click"
                :visible-arrow="false"
              >
                <div slot="reference" class="remarks">
                  {{ scope.row.bill_remarks }}
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="data.fixed_service_fee.length > 0" class="table-cell">
        <span>律师办案服务_固定</span>
        <el-table ref="multipleTable1" :data="data.fixed_service_fee" border>
          <el-table-column prop="id" label="请款ID" width="80">
          </el-table-column>
          <el-table-column prop="debtor_number" label="委托编号" width="150">
          </el-table-column>
          <el-table-column prop="creditor_name" label="债权人" width="250">
          </el-table-column>
          <el-table-column prop="debtor_name" label="债务人" width="150">
          </el-table-column>
          <el-table-column prop="lawyer_name" label="办案律师">
          </el-table-column>
          <el-table-column prop="entrusted_matters" label="办案事项">
          </el-table-column>
          <el-table-column
            prop="fixed_service_fee"
            label="固定服务费"
            width="120"
          >
          </el-table-column>
          <el-table-column
            v-if="billType == 'Bill_Type_1' || billType == 'Bill_Type_2'"
            prop="new_management_rate"
            label="平台管理费率"
            width="120"
          ></el-table-column>
          <el-table-column
            v-if="billType == 'Bill_Type_1' || billType == 'Bill_Type_2'"
            prop="management_fee"
            label="平台管理费额"
            width="120"
          ></el-table-column>
          <el-table-column
            v-if="billType == 'Bill_Type_1'"
            prop="lawyer_fee"
            label="应付律师费"
            width="120"
          ></el-table-column>
          <el-table-column prop="bill_remarks" label="账单备注">
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                trigger="click"
                :content="tostr(scope.row.bill_remarks)"
                popper-class="table-click"
                :visible-arrow="false"
              >
                <div slot="reference" class="remarks">
                  {{ scope.row.bill_remarks }}
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="data.float_service_fee.length > 0" class="table-cell">
        <span>律师办案服务_风险</span>
        <el-table ref="multipleTable2" :data="data.float_service_fee" border>
          <el-table-column prop="id" label="请款ID" width="80">
          </el-table-column>
          <el-table-column prop="debtor_number" label="委托编号" width="150">
          </el-table-column>
          <el-table-column prop="creditor_name" label="债权人" width="250">
          </el-table-column>
          <el-table-column prop="debtor_name" label="债务人" width="150">
          </el-table-column>
          <el-table-column prop="lawyer_name" label="办案律师">
          </el-table-column>
          <el-table-column prop="entrusted_matters" label="办案事项">
          </el-table-column>
          <el-table-column prop="collection_amount" label="回款金额">
          </el-table-column>
          <el-table-column
            prop="float_service_rate"
            label="风险服务费率"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="float_service_fee"
            label="风险服务费"
            width="120"
          >
          </el-table-column>
          <el-table-column
            v-if="billType == 'Bill_Type_1' || billType == 'Bill_Type_2'"
            prop="new_management_rate"
            label="平台管理费率"
            width="120"
          ></el-table-column>
          <el-table-column
            v-if="billType == 'Bill_Type_1' || billType == 'Bill_Type_2'"
            prop="management_fee"
            label="平台管理费额"
            width="120"
          ></el-table-column>
          <el-table-column
            v-if="billType == 'Bill_Type_1'"
            prop="lawyer_fee"
            label="应付律师费"
            width="120"
          ></el-table-column>
          <el-table-column prop="bill_remarks" label="账单备注">
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                trigger="click"
                :content="tostr(scope.row.bill_remarks)"
                popper-class="table-click"
                :visible-arrow="false"
              >
                <div slot="reference" class="remarks">
                  {{ scope.row.bill_remarks }}
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-form
          size="small"
          label-width="80px"
          v-model="data.form.settlement_record"
        >
          <el-form-item label="结算金额">
            <span>
              {{ data.form.settlement_record.settlement_amount }}元/人民币</span
            >
          </el-form-item>
          <el-form-item label="结算方式">
            <span>{{ data.form.settlement_record.settlement_method }}</span>
          </el-form-item>
          <el-form-item label="结算时间">
            <span>{{ data.form.settlement_record.settlement_time }}</span>
          </el-form-item>
          <el-form-item label="流水号">
            <span>{{ data.form.settlement_record.serial_number }}</span>
          </el-form-item>
          <el-form-item label="后台备注">
            <span>{{ data.form.settlement_record.back_remarks }}</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class settlementInfo extends Vue {
  @Prop() billType!: string
  @Prop() infoData!: any
  data: any = {
    ai_pay: [],
    fixed_service_fee: [],
    float_service_fee: [],
    form: {
      bill_id: 0,
      ai_pay: [],
      fixed_service_fee: [],
      float_service_fee: [],
      settlement_record: {
        settlement_number: '',
        settlement_amount: 0,
        settlement_method: '',
        settlement_time: '',
        serial_number: '',
        back_remarks: ''
      }
    }
  }
  @Watch('infoData', { deep: true })
  infoDataVal(newVal: any, oldVal: any) {
    if (newVal) {
      const settlement_record: any = newVal.settlement_record
      this.data.ai_pay = newVal.ai_pay
      const fixed_service_fee: any = newVal.case_pay.filter((item: any) => {
        return (
          item.business_type == 'Entrust_type_5' ||
          item.business_type == 'Entrust_type_6' ||
          item.business_type == 'Entrust_type_8'
        )
      })
      const float_service_fee: any = newVal.case_pay.filter((item: any) => {
        return (
          item.business_type == 'Entrust_type_7' ||
          item.business_type == 'Entrust_type_9'
        )
      })
      this.data.fixed_service_fee = fixed_service_fee
      this.data.float_service_fee = float_service_fee
      Object.keys(this.data.form.settlement_record).forEach((key: string) => {
        this.data.form.settlement_record[key] = settlement_record[key]
      })
      this.data.form.settlement_record.settlement_time = this.data.form.settlement_record.settlement_time.replace(
        'T',
        ' '
      )
    }
  }
  //转字符串
  tostr(val: any) {
    if (val != null) {
      return val.toString()
    } else {
      return val
    }
  }
}
</script>

<style lang="scss">
.settlementInfo {
  & .scroll {
    max-height: 500px;
    overflow-y: auto;
  }
  & .table-cell {
    & > span {
      border-left: 5px solid #ec193a;
      padding-left: 10px;
      display: block;
      font-size: 14px;
    }
    & .el-table {
      width: 100%;
      display: block;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
  & .footer-btn {
    margin-top: 20px;
    text-align: center;
  }
  & .el-form {
    width: 90% !important;
    & .span {
      max-width: 220px;
    }
  }
  & .el-icon-close-tip {
    display: none !important;
  }
}
</style>
