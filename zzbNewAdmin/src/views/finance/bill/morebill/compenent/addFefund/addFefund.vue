<template>
  <div class="addFefund">
    <div class="scroll">
      <div class="table-cell">
        <span>选择结算记录</span>
        <el-table
          :max-height="300"
          ref="multipleTable"
          @selection-change="handleSelectionChange1"
          :data="data.List"
          border
        >
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
            <template slot-scope="scope">
              {{ getTimeStr(scope.row.settlement_time) }}
            </template>
          </el-table-column>
          <el-table-column prop="back_remarks" label="备注"> </el-table-column>
          <el-table-column type="selection" width="55"></el-table-column>
        </el-table>
      </div>
      <div class="table-cell">
        <span>填写开票信息</span>
        <el-form
          size="small"
          label-width="80px"
          v-model="data.form"
          class="demo-form-inline"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="发票类型">
                <el-select
                  @change="invoiceWatch"
                  v-model="data.form.refund_record.invoice_type"
                >
                  <el-option
                    value="Invoice_Type_0"
                    label="增值税普通发票(电子)"
                  ></el-option>
                  <el-option
                    value="Invoice_Type_2"
                    label="增值税专用发票(纸质)"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="快递公司">
                <el-input
                  v-model="data.form.refund_record.courier_services_company"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发票税率">
                <el-input
                  style="width:120px;"
                  v-model="data.form.refund_record.invoice_tax_rate"
                ></el-input>
                <span> %</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="快递单号">
                <el-input
                  v-model="data.form.refund_record.courier_number"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发票金额">
                <el-input
                  style="width:120px;"
                  v-model="data.form.refund_record.invoice_amount"
                ></el-input>
                <span> 元/人民币</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="快递费用">
                <el-select v-model="data.form.refund_record.express_fee">
                  <el-option :value="0" label="无需"></el-option>
                  <el-option :value="1" label="需要"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发票号码">
                <el-input
                  v-model="data.form.refund_record.invoice_number"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开票状态">
                <el-select v-model="data.form.refund_record.invoicing_status">
                  <el-option laber="待开票" value="待开票"></el-option>
                  <el-option laber="已开票未寄" value="已开票未寄"></el-option>
                  <el-option laber="已寄" value="已寄"></el-option>
                  <el-option laber="无需开票" value="无需开票"></el-option>
                  <el-option laber="已收退票" value="已收退票"></el-option>
                  <el-option laber="待收票" value="待收票"></el-option>
                  <el-option laber="已收票" value="已收票"></el-option>
                  <el-option laber="无需收票" value="无需收票"></el-option>
                  <el-option laber="已退回发票" value="已退回发票"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开票日期">
                <el-date-picker
                  v-model="data.form.refund_record.billing_date"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="发票底单">
                <el-upload
                  class="upload-demo"
                  :action="data.baseURL + '/Upload/UploadImage?type=0'"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="1"
                  :on-exceed="handleExceed"
                  :file-list="data.fileList"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <!-- <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div> -->
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="发票备注">
                <el-input
                  type="textarea"
                  :rows="6"
                  placeholder="请输入内容"
                  v-model="data.form.invoice_remarks"
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="table-cell">
        <span>填写退款信息</span>
        <el-form
          size="small"
          label-width="80px"
          v-model="data.form.refund_record"
        >
          <el-form-item label="退款金额">
            <el-input
              style="width:120px;"
              v-model="data.form.refund_record.refund_amount"
            ></el-input>
            <span> 元/人民币</span>
          </el-form-item>
          <el-form-item label="退款方式">
            <el-select v-model="data.form.refund_record.refund_method">
              <el-option label="原路返回" value="原路返回"></el-option>
              <el-option label="微信线上" value="微信线上"></el-option>
              <el-option label="微信线下" value="微信线下"></el-option>
              <el-option label="支付宝线上" value="支付宝线上"></el-option>
              <el-option label="支付宝线下" value="支付宝线下"></el-option>
              <el-option label="银行转账" value="银行转账"></el-option>
              <el-option label="现金" value="现金"></el-option>
              <el-option label="支票" value="支票"></el-option>
              <el-option label="组合" value="组合"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="结算时间">
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm"
              v-model="data.form.refund_record.refund_time"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="流水号">
            <el-input
              v-model="data.form.refund_record.serial_number"
            ></el-input>
          </el-form-item>
          <el-form-item label="后台备注">
            <el-input
              type="textarea"
              :rows="6"
              v-model="data.form.refund_record.back_remarks"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer-btn">
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="quxiao">取消</el-button>
    </div>
  </div>
</template>
<style lang="scss">
@import './addFefund.scss';
</style>
<script lang="ts" src="./addFefund.ts"></script>
