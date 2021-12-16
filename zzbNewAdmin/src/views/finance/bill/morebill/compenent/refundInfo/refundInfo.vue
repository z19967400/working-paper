<template>
  <div class="refundInfo">
    <div class="scroll">
      <div class="table-cell">
        <span>结算记录</span>
        <el-table ref="multipleTable" :data="data.settlement_records" border>
          <el-table-column
            prop="settlement_number"
            label="结算编号"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="settlement_method"
            label="结算方式"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="settlement_amount"
            label="结算金额"
            width="120"
          >
          </el-table-column>
          <el-table-column prop="settlement_time" label="结算时间" width="180">
          </el-table-column>
          <el-table-column prop="back_remarks" label="备注">
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
      <div class="table-cell">
        <span>开票信息</span>
        <el-form
          size="small"
          label-width="80px"
          v-model="data.refund_record"
          class="demo-form-inline"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="发票类型">
                <span>{{ data.refund_record.invoice_type }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="快递公司">
                <span>{{ data.refund_record.courier_services_company }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发票税率">
                <span>{{ data.refund_record.invoice_tax_rate }}%</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="快递单号">
                <span>{{ data.refund_record.courier_number }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发票金额">
                <span> {{ data.refund_record.invoice_amount }} 元/人民币</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="快递费用">
                <span>{{ data.refund_record.express_fee }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发票号码">
                <span>{{ data.refund_record.invoice_number }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开票状态">
                <span>{{ data.refund_record.invoicing_status }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开票日期">
                <span>{{ data.refund_record.billing_date }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发票底单">
                <img
                  class="img"
                  style="width:120px;"
                  :src="data.refund_record.invoice_img"
                  @click="open(data.refund_record.invoice_img)"
                  alt="发票底单"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发票备注">
                <span>{{ data.refund_record.invoice_remarks }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="table-cell">
        <span>退款信息</span>
        <el-form size="small" label-width="80px" v-model="data.refund_record">
          <el-form-item label="退款金额">
            <span>{{ data.refund_record.refund_amount }} 元/人民币</span>
          </el-form-item>
          <el-form-item label="退款方式">
            <span>{{ data.refund_record.refund_method }}</span>
          </el-form-item>
          <el-form-item label="结算时间">
            <span>{{ data.refund_record.refund_time }}</span>
          </el-form-item>
          <el-form-item label="流水号">
            <span>{{ data.refund_record.serial_number }}</span>
          </el-form-item>
          <el-form-item label="后台备注">
            <span>{{ data.refund_record.back_remarks }}</span>
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
export default class addSettlement extends Vue {
  @Prop() billType!: string
  @Prop() infoData!: any
  data: any = {
    settlement_records: [],
    refund_record: {
      bill_number: '',
      invoice_type: '',
      invoice_tax_rate: '',
      invoice_amount: 0,
      invoice_remarks: '',
      billing_date: '',
      invoice_number: '',
      courier_services_company: '',
      courier_number: '',
      express_fee: '',
      invoicing_status: '',
      invoice_img: '',
      refund_amount: 0,
      refund_method: '',
      refund_time: '',
      serial_number: '',
      back_remarks: ''
    }
  }
  @Watch('infoData', { deep: true })
  infoDataVal(newVal: any, oldVal: any) {
    if (newVal) {
      this.data.settlement_records = newVal.settlement_records
      this.data.settlement_records.forEach((item: any) => {
        item.settlement_time = item.settlement_time.replace('T', ' ')
        // item.settlement_time = item.settlement_time.substring(
        //   0,
        //   item.settlement_time.lastIndexOf(':')
        // )
      })
      Object.keys(this.data.refund_record).forEach((key: string) => {
        if (newVal.refund_record[key]) {
          this.data.refund_record[key] = newVal.refund_record[key]
        }
      })
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
  //打开图片
  open(path: string) {
    window.open(path)
  }
}
</script>

<style lang="scss">
.refundInfo {
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
      margin-bottom: 20px;
    }
    & .el-table {
      width: 100%;
      display: block;
      margin-bottom: 20px;
    }
  }
  & .footer-btn {
    margin-top: 20px;
    text-align: center;
  }
  & .el-form {
    width: 90% !important;
    & .el-input {
      max-width: 220px;
    }
  }
  & .el-icon-close-tip {
    display: none !important;
  }
  & .img {
    cursor: pointer;
  }
}
</style>
