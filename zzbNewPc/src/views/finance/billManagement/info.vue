<template>
  <div class="bilInfo-wrap">
    <div class="bilInfo-box">
      <div :style="{ height: data.labers.length * 40 + 'px' }" class="left">
        <div class="text">
          <div
            v-for="(item, index) in data.labers"
            :key="index"
            :class="{ act: index == data.actIndex }"
            @click="laberClick(index)"
          >
            <span v-html="item.name"></span>
          </div>
        </div>
        <div class="shuxian-box">
          <div
            :style="{ transform: ' translateY(' + data.actIndex * 40 + 'px)' }"
            class="shuxian"
          ></div>
        </div>
      </div>
      <div class="right" ref="right" :style="{ height: height + 'px' }">
        <div class="section" ref="section0">
          <span style="margin-top:0;" :class="{ act: data.actIndex == 0 }"
            >{{ data.labers[0].name }}
          </span>
          <el-divider></el-divider>
          <div class="box">
            <div class="text">
              <p>
                <span>用户名称</span>
                <span
                  >{{ data.survey.member_name }}(ID：{{
                    data.survey.member_id
                  }})</span
                >
              </p>
              <p>
                <span>账单编号</span>
                <span>{{ data.survey.bill_numebr }}</span>
              </p>
              <p>
                <span>应付金额</span>
                <span>{{
                  thousandBitSeparator(data.survey.bill_total_amount)
                }}</span>
              </p>
            </div>
            <div class="text">
              <p style="opacity:0">11111111111</p>
              <p>
                <span>请款日期</span>
                <span>{{ timeStr(data.survey.create_time) }}</span>
              </p>
              <p>
                <span style="font-size:14px;">{{
                  data.survey.bill_total_amount_x
                }}</span>
              </p>
            </div>
            <div class="text">
              <p style="opacity:0">111111111</p>
              <p>
                <span>最后付款日期</span>
                <span>{{ timeStr(data.survey.last_payment_date) }}</span>
              </p>
              <p>
                <span>货币单位</span>
                <span>人民币元</span>
              </p>
            </div>
          </div>
        </div>

        <div class="section" ref="section1">
          <span style="margin-top:0;" :class="{ act: data.actIndex == 1 }">
            AI律师函服务明细
          </span>
          <el-divider></el-divider>
          <div class="box">
            <el-table
              show-summary
              :data="data.tableData"
              :summary-method="getSummaries"
              border
              style="width: 100%"
              class="table1"
              :max-height="500"
            >
              <el-table-column prop="index" label="序号" width="60">
              </el-table-column>
              <el-table-column
                prop="debtor_number"
                label="委托编号"
                width="140"
              >
              </el-table-column>
              <el-table-column prop="creditor_name" label="债权人">
              </el-table-column>
              <el-table-column prop="debtor_name" label="债务人">
              </el-table-column>
              <el-table-column prop="admin_name" label="管理员" width="120">
              </el-table-column>
              <el-table-column prop="create_time" label="创建时间" width="150">
              </el-table-column>
              <el-table-column prop="unit_price" label="单价" width="120">
                <template slot-scope="scope">
                  <span>{{ thousandBitSeparator(scope.row.unit_price) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="unit_price" label="应付金额" width="120">
                <template slot-scope="scope">
                  <span>{{ thousandBitSeparator(scope.row.unit_price) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="bill_remarks" label="备注">
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="section" ref="section2">
          <span style="margin-top:0;" :class="{ act: data.actIndex == 2 }"
            >律师办案法律服务明细
          </span>
          <el-divider></el-divider>
          <div class="box">
            <el-table
              class="table2"
              show-summary
              :data="data.case_pay"
              :summary-method="getSummaries"
              border
              style="width: 100%"
              :max-height="500"
            >
              <el-table-column prop="index" label="序号" width="60">
              </el-table-column>
              <el-table-column
                prop="debtor_number"
                label="委托编号"
                width="140"
              >
              </el-table-column>
              <el-table-column prop="creditor_name" label="债权人" width="240">
              </el-table-column>
              <el-table-column prop="debtor_name" label="债务人" width="240">
              </el-table-column>
              <el-table-column
                prop="entrusted_matters"
                label="办案事项"
                width="220"
              >
              </el-table-column>
              <el-table-column prop="lawyer_name" label="办案律师" width="120">
              </el-table-column>
              <el-table-column prop="admin_name" label="管理员" width="120">
              </el-table-column>
              <el-table-column prop="create_time" label="创建时间" width="150">
              </el-table-column>
              <el-table-column
                prop="fixed_service_fee"
                label="固定服务费"
                width="120"
              >
                <template slot-scope="scope">
                  <span>{{
                    thousandBitSeparator(scope.row.fixed_service_fee)
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="风险服务费" width="140">
                <el-table-column
                  prop="collection_amount"
                  label="回款金额"
                  width="140"
                >
                  <template slot-scope="scope">
                    <span>{{
                      thousandBitSeparator(scope.row.collection_amount)
                    }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="float_service_rate"
                  label="风险服务费率"
                  width="140"
                >
                </el-table-column>
                <el-table-column
                  prop="float_service_fee"
                  label="风险服务费额"
                  width="140"
                >
                  <template slot-scope="scope">
                    <span>{{
                      thousandBitSeparator(scope.row.float_service_fee)
                    }}</span>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column prop="bill_remarks" label="备注" width="240">
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="section" ref="section3">
          <span style="margin-top:0;" :class="{ act: data.actIndex == 3 }"
            >债主帮收款银行账号信息
          </span>
          <el-divider></el-divider>
          <div class="box">
            <el-descriptions :column="2" border style="width:100%;">
              <el-descriptions-item label="收款户名"
                >上海诚收信息科技有限公司</el-descriptions-item
              >
              <el-descriptions-item label="收款账号"
                >310066577018800357920</el-descriptions-item
              >
              <el-descriptions-item label="银行行号">
                301290050852</el-descriptions-item
              >
              <el-descriptions-item label="收款银行全称">
                中国交通银行上海交银大厦支行
              </el-descriptions-item>
              <el-descriptions-item label="温馨提示" :span="2">
                <span style="color:#ec193a"
                  >支付时，请务必在“摘要”中备注账单编号：{{
                    data.survey.bill_numebr
                  }}</span
                >
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </div>

        <div class="section" ref="section4">
          <span style="margin-top:0;" :class="{ act: data.actIndex == 4 }"
            >发票信息
            <el-button class="edit" @click="open" type="text" size="small"
              >重新选择</el-button
            >
          </span>
          <el-divider></el-divider>
          <div class="box">
            <el-descriptions
              v-if="data.invoice.id != ''"
              :column="2"
              border
              style="width:100%;"
            >
              <el-descriptions-item label="发票类型">{{
                data.invoice.invoice_type
              }}</el-descriptions-item>
              <el-descriptions-item label="收票人姓名">{{
                data.ticket.name
              }}</el-descriptions-item>
              <el-descriptions-item label="名称">
                {{ data.invoice.invoice_name }}</el-descriptions-item
              >
              <el-descriptions-item label="收票人手机">
                {{ data.ticket.phone }}
              </el-descriptions-item>
              <el-descriptions-item label="税号">
                {{ data.invoice.duty_paragraph }}
              </el-descriptions-item>
              <el-descriptions-item label="收票人地址">
                {{ data.ticket.detailed_address }}</el-descriptions-item
              >
              <el-descriptions-item label="地址">
                {{ data.invoice.detailed_address }}</el-descriptions-item
              >
              <el-descriptions-item label="收票人电子邮箱">
                {{ data.ticket.email }}</el-descriptions-item
              >
              <el-descriptions-item label="电话" :span="2">
                {{ data.invoice.telephone }}</el-descriptions-item
              >
              <el-descriptions-item label="开户行" :span="2">
                {{ data.invoice.bank_of_deposit }}</el-descriptions-item
              >
              <el-descriptions-item label="银行账号" :span="2">
                {{ data.invoice.bank_account }}</el-descriptions-item
              >
              <el-descriptions-item label="发票备注" :span="2">
                {{ data.invoice.invoice_remarks }}</el-descriptions-item
              >
            </el-descriptions>
            <el-button v-else @click="open" type="primary"
              >选择发票信息</el-button
            >
          </div>
        </div>

        <div class="section" ref="section5">
          <span style="margin-top:0;" :class="{ act: data.actIndex == 5 }"
            >发票开具状态
          </span>
          <el-divider></el-divider>
          <div class="box">
            <el-descriptions :column="2" border style="width:100%;">
              <el-descriptions-item label="发票类型">{{
                getInvoceName(data.open_invoice.invoice_type)
              }}</el-descriptions-item>
              <el-descriptions-item label="快递公司">{{
                data.open_invoice.courier_services_company
              }}</el-descriptions-item>
              <el-descriptions-item label="发票金额">{{
                thousandBitSeparator(data.open_invoice.invoice_amount)
              }}</el-descriptions-item>
              <el-descriptions-item label="快递单号">{{
                data.open_invoice.courier_number
              }}</el-descriptions-item>
              <el-descriptions-item label="开票号码">{{
                data.open_invoice.invoice_number
              }}</el-descriptions-item>
              <el-descriptions-item label="开票状态">{{
                data.open_invoice.invoicing_status
              }}</el-descriptions-item>
              <el-descriptions-item label="开票日期">{{
                data.open_invoice.billing_date
              }}</el-descriptions-item>
              <el-descriptions-item label="发票底单">{{
                data.open_invoice.invoice_img
              }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </div>
        <div class="section" ref="section6">
          <span style="margin-top:0;" :class="{ act: data.actIndex == 6 }"
            >结算记录
          </span>
          <el-divider></el-divider>
          <div class="box">
            <el-table
              :data="data.settlement_records"
              border
              style="width: 100%"
            >
              <el-table-column prop="settlement_number" label="结算编号">
              </el-table-column>
              <el-table-column prop="settlement_method" label="结算方式">
              </el-table-column>
              <el-table-column prop="settlement_amount" label="结算金额">
              </el-table-column>
              <el-table-column prop="settlement_time" label="结算时间">
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="section" ref="section7">
          <span style="margin-top:0;" :class="{ act: data.actIndex == 7 }"
            >退款记录
          </span>
          <el-divider></el-divider>
          <div class="box">
            <el-table :data="data.refund_records" border style="width: 100%">
              <el-table-column prop="refund_number" label="退款编号">
              </el-table-column>
              <el-table-column prop="refund_method" label="退款方式">
              </el-table-column>
              <el-table-column prop="refund_amount" label="退款金额">
              </el-table-column>
              <el-table-column prop="refund_time" label="退款时间">
              </el-table-column>
            </el-table>
          </div>
        </div>

        <div style="padding-bottom:80px;" class="section" ref="section8">
          <span style="margin-top:0;" :class="{ act: data.actIndex == 8 }"
            >专属客服
          </span>
          <el-divider></el-divider>
          <div class="box">
            <el-descriptions :column="1" border style="width:50%;">
              <el-descriptions-item label="客服姓名">{{
                data.survey.customer_service_name
              }}</el-descriptions-item>
              <el-descriptions-item label="手机号码">{{
                data.survey.customer_service_phone_number
              }}</el-descriptions-item>
              <el-descriptions-item label="电子邮箱">
                {{ data.survey.customer_service_email }}</el-descriptions-item
              >
            </el-descriptions>
          </div>
        </div>
      </div>

      <div class="zhezhao" v-show="data.ApplyForInvoiceShow"></div>
      <el-popover
        :title="data.actIndex2 == 0 ? '选择/新增发票信息' : '选择/新增收票信息'"
        popper-class="editData"
        v-model="data.ApplyForInvoiceShow"
        :width="!data.addInvoiceShow ? 880 : 580"
      >
        <span @click="close" class="el-icon-close close"></span>
        <div v-show="data.actIndex2 == 0" class="table-list1">
          <div v-show="!data.addInvoiceShow">
            <div class="table-header">
              <div>
                <el-input
                  size="small"
                  style="width:220px;"
                  v-model="invoiceSerch"
                  placeholder="请输入名称关键字搜索"
                ></el-input>

                <el-button
                  style="margin-left:20px;"
                  @click="getInvoiceDown"
                  size="small"
                  type="primary"
                  >搜索</el-button
                >
                <el-button
                  style="margin-left:20px;"
                  @click="
                    () => {
                      invoiceSerch = '';
                      getInvoiceDown();
                    }
                  "
                  size="small"
                  type="primary"
                  >清除</el-button
                >
              </div>
              <el-button
                size="small"
                @click="data.addInvoiceShow = true"
                type="primary"
                icon="el-icon-circle-plus-outline"
                >新增发票信息</el-button
              >
            </div>
            <el-table border :data="data.options1">
              <el-table-column prop="invoice_type" label="发票类型" width="180">
              </el-table-column>
              <el-table-column prop="invoice_name" label="名称" width="180">
              </el-table-column>
              <el-table-column prop="duty_paragraph" label="税号" width="180">
              </el-table-column>
              <el-table-column prop="detailed_address" label="地址" width="180">
              </el-table-column>
              <el-table-column prop="telephone" label="电话" width="180">
              </el-table-column>
              <el-table-column
                prop="bank_of_deposit"
                label="开户行"
                width="180"
              >
              </el-table-column>
              <el-table-column prop="bank_account" label="银行账号" width="180">
              </el-table-column>
              <el-table-column prop="create_name" label="创建人" width="180">
              </el-table-column>
              <el-table-column prop="create_time" label="创建时间" width="180">
              </el-table-column>
              <el-table-column fixed="right" label="选择" width="100">
                <template slot-scope="scope">
                  <el-radio v-model="selectInvoceId" :label="scope.row.id"
                    >选中</el-radio
                  >
                </template>
              </el-table-column>
            </el-table>
            <div class="btn-box">
              <el-button @click="close">取消</el-button>
              <el-button
                @click="
                  () => {
                    if (selectInvoceId != 0) {
                      data.actIndex2 = 1;
                    } else {
                      $message.warning('请先选择发票');
                    }
                  }
                "
                >下一步</el-button
              >
            </div>
          </div>
          <div v-show="data.addInvoiceShow">
            <el-form
              :rules="rules"
              label-width="120px"
              :model="data.addInvoiceData"
              ref="ruleForm"
            >
              <el-row>
                <el-col :span="24">
                  <el-form-item label="发票类型" prop="invoice_type">
                    <el-select
                      style="width:400px;"
                      v-model="data.addInvoiceData.invoice_type"
                      placeholder="请选择发票类型"
                    >
                      <el-option
                        label="增值税普通发票（电子）"
                        value="Invoice_Type_0"
                      >
                      </el-option>
                      <!-- <el-option
                        label="增值税普通发票（纸质）"
                        value="Invoice_Type_1"
                      >
                      </el-option> -->
                      <el-option
                        label="增值税专用发票（纸质）"
                        value="Invoice_Type_2"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col style="margin-top:20px;" :span="24">
                  <el-form-item label="抬头" prop="invoice_name">
                    <el-input
                      style="width:400px"
                      v-model="data.addInvoiceData.invoice_name"
                      placeholder="请输入抬头"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px;">
                <el-col :span="24">
                  <el-form-item label="税号" prop="duty_paragraph">
                    <el-input
                      style="width:400px"
                      v-model="data.addInvoiceData.duty_paragraph"
                      placeholder="请输入税号"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col style="margin-top:20px;" :span="24">
                  <el-form-item label="地址" prop="detailed_address">
                    <el-input
                      style="width:400px"
                      v-model="data.addInvoiceData.detailed_address"
                      placeholder="请输入地址"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px;">
                <el-col :span="24">
                  <el-form-item label="电话" prop="telephone">
                    <el-input
                      style="width:400px"
                      v-model="data.addInvoiceData.telephone"
                      placeholder="请输入电话"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col style="margin-top:20px;" :span="24">
                  <el-form-item label="开户行" prop="bank_of_deposit">
                    <el-input
                      style="width:400px"
                      v-model="data.addInvoiceData.bank_of_deposit"
                      placeholder="请输入开户行"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px;">
                <el-col :span="24">
                  <el-form-item label="银行账号" prop="bank_account">
                    <el-input
                      style="width:400px"
                      v-model="data.addInvoiceData.bank_account"
                      placeholder="请输入银行账号"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div style="text-align:center;margin-top:20px;">
              <el-button type="primary" @click="onSubmit('ruleForm')"
                >确定</el-button
              >
              <el-button @click="data.addInvoiceShow = false">取消</el-button>
            </div>
          </div>
        </div>
        <div v-show="data.actIndex2 == 1" class="table-list2">
          <div v-if="!data.addTicketShow">
            <div class="table-header">
              <div>
                <el-input
                  size="small"
                  style="width:220px;"
                  v-model="getTicketData.name"
                  placeholder="请输入收票人姓名关键字搜索"
                ></el-input>

                <el-button
                  style="margin-left:20px;"
                  @click="getTicketDown"
                  size="small"
                  type="primary"
                  >搜索</el-button
                >
                <el-button
                  style="margin-left:20px;"
                  @click="
                    () => {
                      getTicketData.name = '';
                      getTicketDown();
                    }
                  "
                  size="small"
                  type="primary"
                  >清除</el-button
                >
              </div>
              <el-button
                size="small"
                @click="data.addTicketShow = true"
                type="primary"
                icon="el-icon-circle-plus-outline"
                >新增收票信息</el-button
              >
            </div>
            <el-table border :data="data.options2">
              <el-table-column prop="name" label="收票人姓名" width="180">
              </el-table-column>
              <el-table-column prop="phone" label="收票人手机" width="180">
              </el-table-column>
              <el-table-column
                prop="detailed_address"
                label="收票人地址"
                width="180"
              >
              </el-table-column>
              <el-table-column prop="email" label="收票人电子邮箱" width="180">
              </el-table-column>
              <el-table-column prop="create_time" label="创建人" width="180">
              </el-table-column>
              <el-table-column prop="create_time" label="创建时间" width="180">
              </el-table-column>
              <el-table-column fixed="right" label="选择" width="100">
                <template slot-scope="scope">
                  <el-radio v-model="selectTicketId" :label="scope.row.id"
                    >选中</el-radio
                  >
                </template>
              </el-table-column>
            </el-table>
            <div class="btn-box">
              <el-button @click="close">取消</el-button>
              <el-button
                @click="
                  () => {
                    if (selectTicketId != 0) {
                      selects();
                    } else {
                      $message.warning('请先选择收票');
                    }
                  }
                "
                >确定</el-button
              >
            </div>
          </div>
          <div v-else>
            <el-form
              :rules="rules2"
              label-width="120px"
              :model="data.addTicketData"
              ref="ruleForm2"
            >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="收票人姓名" prop="name">
                    <el-input v-model="data.addTicketData.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="收票人手机" prop="phone">
                    <el-input v-model="data.addTicketData.phone"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px;">
                <el-col :span="12">
                  <el-form-item label="收票人地址" prop="detailed_address">
                    <el-input
                      v-model="data.addTicketData.detailed_address"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="收票人电子邮箱" prop="email">
                    <el-input v-model="data.addTicketData.email"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div style="margin-top:20px;text-align:center;">
              <el-button type="primary" @click="onSubmit2('ruleForm2')"
                >确定</el-button
              >
              <el-button @click="data.addTicketShow = false">取消</el-button>
            </div>
          </div>
        </div>
      </el-popover>
      <!-- end -->
    </div>
    <div class="footer-box">
      <el-button
        size="small"
        style="margin-left:145px;"
        @click="goBack"
        type="primary"
        >返回</el-button
      >
      <el-button
        v-show="data.bill_file"
        @click="download(data.bill_file)"
        size="small"
        type="primary"
        >下载账单</el-button
      >
      <el-button
        v-show="data.bill_file_ai"
        @click="download(data.bill_file_ai)"
        size="small"
        type="primary"
        >下载AI律师函服务请款单</el-button
      >
      <el-button
        v-show="data.bill_file_case"
        @click="download(data.bill_file_case)"
        size="small"
        type="primary"
        >下载律师办案法律服务请款单</el-button
      >
      <el-button size="small" @click="ApplyInvoicing" type="primary"
        >申请开票</el-button
      >
    </div>
  </div>
</template>
<script lang="ts" src="./info.ts"></script>
<style lang="scss">
@import "./info.scss";
</style>
