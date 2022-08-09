<template>
  <div class="openInvoice">
    <el-form
      size="small"
      label-width="80px"
      v-model="data.form"
      class="demo-form-inline"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="发票类型">
            <!-- <el-select @change="invoiceWatch" v-model="data.form.invoice_type">
              <el-option
                value="Invoice_Type_0"
                label="增值税普通发票(电子)"
              ></el-option>
              <el-option
                value="Invoice_Type_2"
                label="增值税专用发票(纸质)"
              ></el-option>
            </el-select> -->
            <span>{{ invoice_types }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="快递公司">
            <el-input v-model="data.form.courier_services_company"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="发票税率">
            <el-input
              style="width:120px;"
              v-model="data.form.invoice_tax_rate"
            ></el-input>
            <span> %</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="快递单号">
            <el-input v-model="data.form.courier_number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="发票金额">
            <el-input
              style="width:120px;"
              v-model="data.form.invoice_amount"
            ></el-input>
            <span> 元/人民币</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="快递费用">
            <el-select v-model="data.form.express_fee">
              <el-option :value="1" label="诚收付款"></el-option>
              <el-option :value="2" label="用户付款"></el-option>
              <el-option :value="-1" label="无需"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="发票号码">
            <el-input v-model="data.form.invoice_number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="开票状态">
            <el-select v-model="data.form.invoicing_status">
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
              v-model="data.form.billing_date"
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
        <el-col :span="22">
          <el-form-item label="开票要求">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="data.form.Invoicing_requirements"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22">
          <el-form-item label="打印在发票备注框中的文字">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="此备注内容将在发票上展示"
              v-model="data.form.invoice_remarks"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer-btn">
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="quxiao">取消</el-button>
    </div>
  </div>
</template>
<style lang="scss">
@import './openInvoice.scss';
</style>
<script lang="ts" src="./openInvoice.ts"></script>
