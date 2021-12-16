<template>
  <div class="morebill-wrap">
    <div class="morebill-box">
      <div :style="{ height: data.labers.length * 40 + 'px' }" class="left">
        <div class="text">
          <div
            v-for="(item, index) in data.labers"
            :key="index"
            :class="{
              act: index == data.actIndex,
              isHide: item.name == '操作权限' && data.state == 0
            }"
            @click="laberClick(index)"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="shuxian-box">
          <div
            :style="{
              transform: 'translateY(' + data.actIndex * 40 + 'px)'
            }"
            class="shuxian"
          ></div>
        </div>
      </div>
      <div ref="right" :style="{ height: height + 'px' }" class="right">
        <!-- 账单概括 -->
        <div ref="section0" class="section">
          <span style="margin-top:0;" :class="{ act: data.actIndex == 0 }">{{
            data.labers[0].name
          }}</span>
          <el-divider></el-divider>
          <div class="box">
            <div
              v-for="(item, index) in data.BasicInfo"
              :key="index"
              class="text"
              :style="{
                width: index == 0 ? '40%' : index == 1 ? '25%' : '35%'
              }"
            >
              <p
                v-show="item2.show"
                v-for="(item2, index2) in item"
                :key="index2"
              >
                <span>{{ item2.name }}</span>
                <span
                  v-if="item2.name === '用户名称'"
                  @click="openInfo"
                  class="openInfo"
                  >{{ item2.value }}</span
                >
                <payDate
                  :value="item2.value"
                  @init="init"
                  :bill_id="data.id"
                  :type="item.prop == 'create_time' ? 0 : 1"
                  v-else-if="
                    item2.prop == 'create_time' ||
                      item2.prop == 'last_payment_date'
                  "
                ></payDate>
                <span v-else>{{ item2.value }}</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 客服 -->
        <div ref="section1" class="section">
          <span :class="{ act: data.actIndex == 1 }"
            >{{ data.labers[1].name }}
          </span>
          <el-divider></el-divider>
          <div class="box">
            <el-row>
              <span style="font-size:14px;margin-right:20px;color:#909399;"
                >客服</span
              >
              <el-select
                class="select02"
                size="small"
                ref="saveTagInput"
                v-model="data.admin_id"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in data.options2"
                  :key="item.id"
                  :label="item.real_name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
              <el-button
                style="margin-left:20px;"
                size="small"
                type="primary"
                plain
                @click="handleInputConfirm2"
                >保存</el-button
              >
            </el-row>
          </div>
        </div>
        <!-- 账单推送对象 -->
        <div ref="section2" class="section">
          <span
            v-show="data.billData.m_type"
            :class="{ act: data.actIndex == 2 }"
          >
            {{ data.labers[2].name }}
            <span
              v-show="data.billData.m_type == 'VIP'"
              @click="openDialog('新增', data.labers[2].name)"
              style="color:#67C23A;"
              >新增</span
            >
          </span>
          <el-divider></el-divider>
          <div class="box">
            <adminTab
              :billType="data.billData.bill_type"
              :tabList="data.billData.push_object"
              :mType="data.billData.m_type"
              @delected="pushObjDelect"
            ></adminTab>
          </div>
        </div>
        <!-- 服务详情 -->
        <div ref="section3" class="section">
          <span :class="{ act: data.actIndex == 3 }"
            >{{ data.labers[3].name }}
          </span>
          <el-divider></el-divider>
          <div class="box">
            <billList
              :billType="data.billData.bill_type"
              :case_pay="data.billData.case_pay"
              :ai_pay="data.billData.ai_pay"
              :bill_id="data.id"
              :settingTime="settingTime"
              @delected="serverDelect"
              @init="init"
            ></billList>
          </div>
        </div>
        <!-- 发票信息 -->
        <div
          v-show="data.billData.bill_type != 'Bill_Type_1'"
          ref="section4"
          class="section"
        >
          <span :class="{ act: data.actIndex == 4 }"
            >{{ data.labers[4].name }}
            <span
              v-if="
                data.billData.m_type == '普通用户' &&
                  data.billData.invoice.length > 0
              "
              @click="openDialog('更换', data.labers[4].name)"
              style="color:#67C23A;"
              >更换</span
            >
            <span
              v-else
              @click="openDialog('选择', data.labers[4].name)"
              style="color:#67C23A;"
              >选择</span
            >
          </span>
          <el-divider></el-divider>
          <div class="box">
            <el-table border :data="data.billData.invoice">
              <el-table-column prop="id" label="发票信息ID" width="100">
              </el-table-column>
              <el-table-column prop="invoice_type" label="发票类型" width="180">
                <template slot-scope="scope">
                  {{ getInvoicName(scope.row.invoice_type) }}
                </template>
              </el-table-column>
              <el-table-column prop="invoice_name" label="名称" width="220">
              </el-table-column>
              <el-table-column prop="duty_paragraph" label="税号" width="180">
              </el-table-column>
              <el-table-column prop="detailed_address" label="地址" width="250">
              </el-table-column>
              <el-table-column prop="telephone" label="电话" width="120">
              </el-table-column>
              <el-table-column
                prop="bank_of_deposit"
                label="开户行"
                width="220"
              >
              </el-table-column>
              <el-table-column prop="bank_account" label="银行账号" width="180">
              </el-table-column>
              <!-- <el-table-column prop="invoice_remarks" label="发票备注">
              </el-table-column> -->
              <el-table-column prop="create_name" label="创建人" width="120">
              </el-table-column>
              <el-table-column
                prop="create_time"
                label="创建时间"
                width="150px"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.create_time }}</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="80">
                <template slot-scope="scope">
                  <el-button
                    style="color:#E6A23C;"
                    @click="
                      openDialog('编辑', data.labers[4].name, scope.row.id)
                    "
                    type="text"
                    >编辑</el-button
                  >
                  <!-- <el-button style="color:e01f3c;" type="text">删除</el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 收票信息 -->
        <div
          ref="section5"
          v-show="data.billData.bill_type != 'Bill_Type_1'"
          class="section"
        >
          <span :class="{ act: data.actIndex == 5 }">
            {{ data.labers[5].name }}
            <span
              v-if="
                data.billData.m_type == '普通用户' &&
                  data.billData.ticket.length > 0
              "
              @click="openDialog('更换', data.labers[5].name)"
              style="color:#67C23A;"
              >更换</span
            >
            <span
              v-else
              @click="openDialog('选择', data.labers[5].name)"
              style="color:#67C23A;"
              >选择</span
            >
          </span>
          <el-divider></el-divider>
          <div style="flex-wrap:wrap" class="box">
            <el-table border :data="data.billData.ticket">
              <el-table-column prop="id" label="收票ID" width="100">
              </el-table-column>
              <el-table-column prop="name" label="收票人姓名">
              </el-table-column>
              <el-table-column prop="phone" label="收票人手机">
              </el-table-column>
              <el-table-column prop="detailed_address" label="收票人地址">
              </el-table-column>
              <!-- <el-table-column prop="name" label="收票人电子邮箱">
              </el-table-column> -->
              <el-table-column prop="create_name" label="创建人">
              </el-table-column>
              <el-table-column prop="create_time" label="创建时间">
              </el-table-column>
              <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                  <el-button
                    @click="
                      openDialog('选择', data.labers[5].name, scope.row.id)
                    "
                    style="color:#E6A23C;"
                    type="text"
                    >编辑</el-button
                  >
                  <!-- <el-button style="color:e01f3c;" type="text">删除</el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 律所收款信息 -->
        <div v-show="data.billData.bill_type == 'Bill_Type_1'" class="section">
          <span :class="{ act: data.actIndex == 5 }">
            律师收款信息
            <span
              v-show="data.billData.collection_info.length == 0"
              @click="editShoukuan()"
              style="color:#67C23A;"
              >新增</span
            >
          </span>
          <el-divider></el-divider>
          <div style="flex-wrap:wrap" class="box">
            <el-table border :data="data.billData.collection_info">
              <el-table-column prop="id" label="发票ID" width="80">
              </el-table-column>
              <!-- <el-table-column prop="invoice_type" label="发票类型">
                <template slot-scope="scope">
                  {{ getInvoicName(scope.row.invoice_type) }}
                </template>
              </el-table-column> -->
              <el-table-column
                prop="invoice_tax_rate"
                label="发票税率(%)"
                width="120"
              >
              </el-table-column>
              <el-table-column prop="account_name" label="收款户名">
              </el-table-column>
              <!-- <el-table-column prop="name" label="收票人电子邮箱">
              </el-table-column> -->
              <el-table-column prop="account_number" label="收款账号">
              </el-table-column>
              <el-table-column prop="bank_full_name" label="收款银行全称">
              </el-table-column>
              <el-table-column prop="bank_no" label="收款银行行号">
              </el-table-column>
              <el-table-column prop="telephone" label="联系人电话">
              </el-table-column>
              <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                  <el-button @click="editShoukuan(scope.row)" type="text"
                    >编辑</el-button
                  >
                  <!-- <el-button style="color:e01f3c;" type="text">删除</el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <!-- 开票操作 -->
        <div ref="section6" class="section">
          <span :class="{ act: data.actIndex == 7 }">
            {{ data.labers[6].name }}
            <span
              v-show="data.billData.open_invoices.length <= 0"
              @click="openDialog2"
              style="color:#67C23A;"
            >
              新增
            </span>
          </span>
          <el-divider></el-divider>
          <div class="box">
            <el-table border :data="data.billData.open_invoices">
              <el-table-column prop="id" label="开票ID" width="80">
              </el-table-column>
              <el-table-column prop="invoice_type" label="发票类型" width="180">
              </el-table-column>
              <el-table-column
                prop="invoice_tax_rate"
                label="发票税率(%)"
                width="150"
              >
              </el-table-column>
              <el-table-column
                prop="invoice_amount"
                label="发票金额"
                width="150"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row.invoice_amount.toLocaleString() }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column
                prop="invoice_remarks"
                label="发票备注"
                width="150"
              >
              </el-table-column> -->
              <el-table-column prop="billing_date" label="开票日期" width="150">
              </el-table-column>
              <el-table-column
                prop="invoice_number"
                label="发票号码"
                width="150"
              >
              </el-table-column>
              <el-table-column
                prop="courier_services_company"
                label="快递公司"
                width="150"
              >
              </el-table-column>
              <el-table-column
                prop="courier_number"
                label="快递单号"
                width="150"
              >
              </el-table-column>
              <el-table-column
                prop="invoice_remarks"
                label="发票备注"
                width="250"
              >
                <template slot-scope="scope">
                  <el-popover
                    placement="bottom"
                    trigger="click"
                    :content="tostr(scope.row.invoice_remarks)"
                    popper-class="table-click"
                    :visible-arrow="false"
                  >
                    <div slot="reference" class="remarks">
                      {{ scope.row.invoice_remarks }}
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column prop="express_fee" label="快递费用" width="150">
                <template slot-scope="scope">
                  <span>{{
                    scope.row.express_fee == 0
                      ? '无需'
                      : scope.row.express_fee == 1
                      ? '诚收付款'
                      : scope.row.express_fee == 2
                      ? '用户付款'
                      : ' '
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="invoicing_status"
                label="开票状态"
                width="150"
              >
              </el-table-column>
              <el-table-column label="发票底单" width="120">
                <template slot-scope="scope">
                  <img
                    v-if="scope.row.invoice_img"
                    @click="open(scope.row.invoice_img)"
                    style="width:100%;cursor: pointer;"
                    :src="scope.row.invoice_img"
                    alt=""
                  />
                  <span v-else>无</span>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="name" label="创建人"> </el-table-column> -->
              <el-table-column prop="create_time" label="创建时间" width="150">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="80">
                <template slot-scope="scope">
                  <el-button @click="openDialog2(scope.row)" type="text"
                    >编辑</el-button
                  >
                  <!-- <el-button style="color:e01f3c;" type="text">删除</el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 结算状态 -->
        <div ref="section7" class="section">
          <span :class="{ act: data.actIndex == 6 }">
            {{ data.labers[7].name }}
            <span
              @click="data.SettlementType = !data.SettlementType"
              style="color:#67C23A;"
              >{{ data.SettlementType == false ? '编辑' : '返回' }}</span
            >
          </span>
          <el-divider></el-divider>
          <div class="box">
            <span style="font-size:14px;" v-if="!data.SettlementType">{{
              this.data.BasicInfo[2][0].value
            }}</span>

            <div v-else>
              <el-radio-group v-model="data.SettlementStatus">
                <el-radio
                  v-for="(item, index) in Settlement_Status"
                  :key="index"
                  :label="item.prop"
                  >{{ item.name }}</el-radio
                >
              </el-radio-group>
              <div style="margin-top:20px;">
                <el-button
                  @click="saveSettlement"
                  size="small"
                  type="primary"
                  plain
                  >保存</el-button
                >
                <el-button @click="quxiao" size="small" plain>取消</el-button>
              </div>
            </div>
          </div>
        </div>
        <!-- 结算记录 -->
        <div ref="section8" class="section">
          <span :class="{ act: data.actIndex == 8 }">
            {{ data.labers[8].name }}
            <span @click="dialogVisible3 = true" style="color:#67C23A;"
              >新增结算</span
            >
          </span>
          <el-divider></el-divider>
          <div class="box">
            <p style="font-size:14px;color:#606366;width:100%;">
              <span
                >应结算金额：{{
                  data.billData.bill_total_amount.toLocaleString()
                }}</span
              >
              <span style="margin-left:50px;"
                >已结算金额：{{
                  data.billData.bill_settled_amount.toLocaleString()
                }}</span
              >
            </p>
            <el-table
              :max-height="500"
              border
              :data="data.billData.settlement_records"
            >
              <el-table-column prop="settlement_number" label="结算编号">
              </el-table-column>
              <el-table-column prop="settlement_method" label="结算方式">
              </el-table-column>
              <el-table-column prop="settlement_amount" label="结算金额">
                <template slot-scope="scope">
                  {{ scope.row.settlement_amount.toLocaleString() }}
                </template>
              </el-table-column>
              <el-table-column prop="settlement_time" label="结算时间">
              </el-table-column>
              <el-table-column prop="serial_number" label="流水号">
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
              <!-- <el-table-column prop="name" label="创建人"> </el-table-column> -->
              <el-table-column prop="create_time" label="创建时间">
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <el-button
                    style="color:#409EFF;"
                    @click="seeInfo(1, scope.row.id)"
                    type="text"
                    >查看</el-button
                  >
                  <el-button
                    @click="settlementDelect(scope.row.id)"
                    style="color:e01f3c;"
                    type="text"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 退款记录 -->
        <div ref="section9" class="section">
          <span :class="{ act: data.actIndex == 9 }">
            {{ data.labers[9].name }}
            <span @click="dialogVisible4 = true" style="color:#67C23A;"
              >新增退款</span
            >
          </span>
          <el-divider></el-divider>
          <div class="box">
            <el-table
              :max-height="500"
              border
              :data="data.billData.refund_records"
            >
              <el-table-column prop="refund_number" label="退款编号">
              </el-table-column>
              <el-table-column prop="refund_method" label="退款方式">
              </el-table-column>
              <el-table-column prop="refund_amount" label="退款金额">
                <template slot-scope="scope">
                  {{ scope.row.refund_amount.toLocaleString() }}
                </template>
              </el-table-column>
              <el-table-column prop="refund_time" label="退款时间">
              </el-table-column>
              <el-table-column prop="serial_number" label="流水号">
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
              <!-- <el-table-column prop="name" label="创建人"> </el-table-column> -->
              <el-table-column prop="create_time" label="创建时间">
              </el-table-column>
              <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                  <el-button
                    style="color:#409EFF;"
                    @click="seeInfo(2, scope.row.id)"
                    type="text"
                    >查看</el-button
                  >
                  <el-button
                    @click="refundDelect(scope.row.id)"
                    style="color:e01f3c;"
                    type="text"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 后台备注 -->
        <div ref="section10" class="section">
          <span :class="{ act: data.actIndex == 10 }">{{
            data.labers[10].name
          }}</span>
          <el-divider></el-divider>
          <div class="box">
            <div style="width:100%;">
              <el-input
                type="textarea"
                style="width:90%;"
                placeholder="请输入内容"
                v-model="data.billData.back_remarks"
                :rows="12"
                show-word-limit
              >
              </el-input>
              <el-button
                style="display:block;margin-top:20px;"
                @click="saveRemake"
                size="small"
                type="primary"
                plain
                >保存</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bins">
        <el-button size="small" @click="goBack" type="primary" plain
          >返回</el-button
        >
        <el-button
          v-show="data.bill_file == ''"
          size="small"
          @click="createBill"
          type="primary"
          plain
          >生成账单</el-button
        >
        <el-button
          v-show="data.bill_file != ''"
          size="small"
          @click="createBill"
          type="primary"
          plain
          >重新生成账单</el-button
        >
        <el-button
          size="small"
          v-show="data.bill_file != ''"
          @click="download"
          type="primary"
          plain
          >下载账单</el-button
        >
        <el-button size="small" @click="delectBill" type="primary"
          >删除账单</el-button
        >
      </div>
    </div>
    <el-dialog
      :title="dialogName"
      :visible.sync="dialogVisible"
      :before-close="
        () => {
          dialogVisible = false
        }
      "
    >
      <selectAdmin
        @init="init"
        @close="closeDialog"
        :bill_number="data.billData.bill_number"
        :mId="data.billData.member_id"
        :list="data.pushObj"
        :selectList="data.billData.push_object"
        v-if="dialogName == '新增账单推送对象'"
      ></selectAdmin>
      <invoice
        :invoiceList="data.invoice"
        :selectInvoices="data.billData.invoice"
        :titleName="dialogName"
        :adminList="data.pushObj"
        :mId="data.billData.member_id"
        :dialogVisible="dialogVisible"
        :billID="data.id"
        :selectId="data.selectId"
        @init="init"
        @close="closeDialog"
        v-else-if="
          dialogName == '选择发票信息' ||
            dialogName == '更换发票信息' ||
            dialogName == '编辑发票信息'
        "
      ></invoice>
      <ticket
        :List="data.ticket"
        :titleName="dialogName"
        :adminList="data.pushObj"
        :mId="data.billData.member_id"
        :dialogVisible="dialogVisible"
        :billID="data.id"
        :selectId="data.selectId"
        :selectTicket="data.billData.ticket"
        @init="init"
        @close="closeDialog"
        v-else-if="
          dialogName == '选择收票信息' ||
            dialogName == '更换收票信息' ||
            dialogName == '编辑收票信息'
        "
      ></ticket>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible2" title="开票操作">
      <openInvoice
        :bill_number="data.billData.bill_number"
        @close="closeDialog"
        @init="init"
        :invoice_types="data.invoice_types"
        :editData="data.openInvoiceData"
        :totalAmount="data.billData.bill_total_amount"
      ></openInvoice>
    </el-dialog>
    <el-dialog
      :destroy-on-close="true"
      :visible.sync="dialogVisible3"
      title="新增结算记录"
    >
      <addSettlement
        :billType="data.billData.bill_type"
        :billId="data.id"
        @close="closeDialog"
        @init="init"
      ></addSettlement>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible4"
      :destroy-on-close="true"
      title="新增退款记录"
    >
      <addFefund
        @close="closeDialog"
        @init="init"
        :bill_number="data.billData.bill_number"
      ></addFefund>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible5" title="结算详情">
      <settlementInfo
        :billType="data.billData.bill_type"
        :infoData="data.infoData1"
      ></settlementInfo>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible6" title="退款详情">
      <refundInfo
        :billType="data.billData.bill_type"
        :infoData="data.infoData2"
      ></refundInfo>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible7" title="新增/编辑收款信息">
      <collection
        :mId="data.billData.member_id"
        :adminList="data.pushObj"
        :editData="data.shoukuanEdit"
        :bill_number="data.billData.bill_number"
        @close="closeDialog"
        @init="init"
      ></collection>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import * as Api from '../../../../api/finance'
import billList from '../../componets/billList/billList.vue'
import selectAdmin from '../../componets/selectAdmin/selectAdmin.vue'
import selectUser from '../../componets/selectUser/selectUser.vue'
import adminTab from './compenent/adminTab.vue'
import invoice from '../../componets/invoice/invoice.vue'
import ticket from '../../componets/ticket/ticket.vue'
import openInvoice from '../../componets/openInvoice/openInvoice.vue'
import addSettlement from './compenent/addSettlement/addSettlement.vue'
import addFefund from './compenent/addFefund/addFefund.vue'
import settlementInfo from './compenent/settlementInfo/settlementInfo.vue'
import refundInfo from './compenent/refundInfo/refundInfo.vue'
import collection from './compenent/collection.vue'
import payDate from './compenent/paydate.vue'
@Component({
  components: {
    billList,
    selectAdmin,
    selectUser,
    adminTab,
    invoice,
    ticket,
    openInvoice,
    addSettlement,
    addFefund,
    settlementInfo,
    refundInfo,
    collection,
    payDate
  }
})
export default class About extends Vue {
  // data
  data: any = {
    actIndex: 0,
    visible: false,
    sendstates: [],
    editShow: false,
    id: '',
    bill_file: '',
    admin_id: '',
    infoData1: {},
    infoData2: {},
    labers: [
      { name: '账单概况' },
      { name: '客服' },
      { name: '账单推送对象' },
      { name: '服务详情' },
      { name: '发票信息' },
      { name: '收票信息' },
      { name: '开票操作' },
      { name: '结算状态' },
      { name: '结算记录' },
      { name: '退款记录' },
      { name: '后台备注' }
    ],
    BasicInfo: [
      //账单概括
      [
        { name: '账单名称', value: '', prop: 'bill_title', show: true },
        { name: '账单类别', value: '', prop: 'bill_type', show: true },
        { name: '用户名称', value: '', prop: 'member_name', show: true }
      ],
      [
        { name: '账单编号', value: '', prop: 'bill_number', show: true },
        { name: '账单币种', value: '', prop: 'currency_name', show: true },
        {
          name: '账单应付金额',
          value: '',
          prop: 'bill_total_amount',
          show: true
        }
      ],
      [
        { name: '结算状态', value: '', prop: 'settlement_status', show: true },
        { name: '请款日期', value: '', prop: 'create_time', show: true },
        {
          name: '用户付款账期',
          value: '',
          prop: 'last_payment_date',
          show: true
        }
      ]
    ],
    customers: [],
    options2: [], //管理员(客服)下拉
    pushObj: [], //可选的推送对象列表
    invoice: [], //发票信息列表
    ticket: [], //收票信息列表
    selectId: 0, //发票收票修改ID
    shoukuanEdit: {}, //收款信息编辑数据
    openInvoiceData: {}, //开票操作数据
    invoice_types: '', //发票类型
    billData: {
      member_id: '', //管理员ID
      bill_number: '', //账单编号
      bill_total_amount: '', //账单总金额
      bill_settled_amount: '', //账单已结算金额
      m_type: '', //用户类别
      bill_type: '', //账单类别
      push_object: [], //账单推送对象
      ai_pay: [], //AI律师函
      case_pay: [], //律师办案
      invoice: [], //发票信息
      ticket: [], //收票信息
      open_invoices: [], //开票记录
      settlement_records: [], //结算记录
      refund_records: [], //退款记录
      collection_info: [], //收款信息
      back_remarks: '' //后台备注
    },
    SettlementStatus: '',
    SettlementType: false
  }
  Settlement_Status: any = [
    { name: '审核中', prop: 'Settlement_Status_0' },
    { name: '用户确认', prop: 'Settlement_Status_1' },
    { name: '客服确认', prop: 'Settlement_Status_2' },
    { name: '开票中', prop: 'Settlement_Status_3' },
    { name: '结算中', prop: 'Settlement_Status_4' },
    { name: '已结算', prop: 'Settlement_Status_5' },
    { name: '已退款', prop: 'Settlement_Status_6' }
  ]
  invoice_types: any = [
    { name: '增值税普通发票（电子）', prop: 'Invoice_Type_0' },
    { name: '增值税普通发票（纸质）', prop: 'Invoice_Type_1' },
    { name: '增值税专用发票（纸质）', prop: 'Invoice_Type_2' }
  ]
  dialogVisible: boolean = false
  dialogVisible2: boolean = false
  dialogVisible3: boolean = false
  dialogVisible4: boolean = false
  dialogVisible5: boolean = false
  dialogVisible6: boolean = false
  dialogVisible7: boolean = false
  dialogName: string = ''
  height: number = 0
  settingTime: string = ''
  sectionDom: any = {}
  created() {
    //
  }

  activated() {
    //
  }

  mounted() {
    let self: any = this
    this.getBillInfo()
    self.height = document.body.offsetHeight - 188
    this.getKefuAll()
  }
  //初始化
  init() {
    this.getBillInfo()
  }
  //获取账单详情
  getBillInfo() {
    const self: any = this
    Api.GetBillDetails(self.$route.params.id).then((res: any) => {
      this.data.billData.bill_type = res.data.bill_details.bill_type
      if (res.data.bill_details.start_time) {
        this.settingTime =
          res.data.bill_details.start_time +
          ' - ' +
          res.data.bill_details.end_time
      }

      if (this.data.billData.bill_type == 'Bill_Type_1') {
        this.data.BasicInfo[2][2].show = false
      }
      res.data.bill_details.bill_type =
        res.data.bill_details.bill_type == 'Bill_Type_0'
          ? '法律服务费请款单_诚收向用户请款'
          : res.data.bill_details.bill_type == 'Bill_Type_1'
          ? '律师费请款单_律师向诚收请款'
          : '平台管理费请款单_诚收向律所请款'
      this.data.SettlementStatus = res.data.bill_details.settlement_status
      res.data.bill_details.settlement_status = this.getSettlementName(
        res.data.bill_details.settlement_status
      )
      if (res.data.bill_details.bill_file) {
        this.data.bill_file = res.data.bill_details.bill_file
      }
      this.data.admin_id = res.data.bill_details.customer_service_admin_id
      this.data.id = res.data.bill_details.id
      res.data.bill_details.create_time = res.data.bill_details.create_time.replace(
        'T',
        ' '
      )
      res.data.bill_details.create_time = res.data.bill_details.create_time.substring(
        0,
        res.data.bill_details.create_time.lastIndexOf(':')
      )
      res.data.bill_details.last_payment_date = res.data.bill_details.last_payment_date.replace(
        'T',
        ' '
      )
      res.data.bill_details.last_payment_date = res.data.bill_details.last_payment_date.substring(
        0,
        res.data.bill_details.last_payment_date.lastIndexOf(':')
      )
      this.data.billData.push_object = res.data.push_object
      this.data.billData.m_type = res.data.bill_details.m_type
      this.data.billData.ai_pay = res.data.ai_pay
      this.data.billData.case_pay = res.data.case_pay
      this.data.billData.invoice = res.data.invoice || []
      this.data.billData.bill_number = res.data.bill_details.bill_number
      this.data.billData.invoice.forEach((item: any) => {
        let xx: any = this.invoice_types.filter((item2: any) => {
          return item2.prop == item.invoice_type
        })

        if (xx.length > 0) {
          // item.invoice_type = xx[0].name
          this.data.invoice_types = xx[0].name
        }

        item.create_time = item.create_time.replace('T', ' ')
        item.create_time = item.create_time.substring(
          0,
          item.create_time.lastIndexOf(':')
        )
      })
      this.data.billData.ticket = res.data.ticket_address || []
      this.data.billData.ticket.forEach((item: any) => {
        item.create_time = item.create_time.replace('T', ' ')
        item.create_time = item.create_time.substring(
          0,
          item.create_time.lastIndexOf(':')
        )
      })
      this.data.billData.open_invoices = res.data.open_invoices || []
      this.data.billData.open_invoices.forEach((item: any) => {
        item.create_time = item.create_time.replace('T', ' ')
        item.create_time = item.create_time.substring(
          0,
          item.create_time.lastIndexOf(':')
        )
        let row: any = this.invoice_types.filter((item2: any) => {
          return item2.prop == item.invoice_type
        })
        if (row.length != 0) {
          item.invoice_type = row[0].name
        }
      })
      this.data.billData.bill_total_amount =
        res.data.bill_details.bill_total_amount
      this.data.billData.bill_settled_amount =
        res.data.bill_details.bill_settled_amount
      this.data.billData.back_remarks = res.data.bill_details.back_remarks
      this.data.billData.member_id = res.data.bill_details.member_id
      this.data.billData.settlement_records = res.data.settlement_records
      this.data.billData.collection_info = res.data.collection_info
      this.data.billData.settlement_records.forEach((item: any) => {
        item.create_time = item.create_time.replace('T', ' ')
        item.create_time = item.create_time.substring(
          0,
          item.create_time.lastIndexOf(':')
        )
        item.settlement_time = item.settlement_time.replace('T', ' ')
        item.settlement_time = item.settlement_time.substring(
          0,
          item.settlement_time.lastIndexOf(':')
        )
      })
      this.data.BasicInfo.forEach((item: any) => {
        item.forEach((item2: any) => {
          if (item2.prop == 'currency_name') {
            item2.value =
              res.data.bill_details[item2.prop] +
              '/' +
              res.data.bill_details.currency_unit
          } else if (item2.prop == 'member_name') {
            if (this.data.billData.bill_type == 'Bill_Type_0') {
              item2.value = `${res.data.bill_details['create_name']} (ID：${res.data.bill_details['member_id']})`
            } else {
              item2.name = '律师姓名'
              item2.value = `${res.data.bill_details['lawyer_name']} (ID：${res.data.bill_details['lawyer_id']})`
            }
          } else {
            item2.value = res.data.bill_details[item2.prop]
          }
        })
      })
      this.data.billData.refund_records = res.data.refund_records
      this.data.billData.refund_records.forEach((item: any) => {
        item.create_time = item.create_time.replace('T', ' ')
        item.create_time = item.create_time.substring(
          0,
          item.create_time.lastIndexOf(':')
        )
        item.refund_time = item.refund_time.replace('T', ' ')
        item.refund_time = item.refund_time.substring(
          0,
          item.refund_time.lastIndexOf(':')
        )
      })
      if (this.data.billData.m_type == 'VIP') {
        this.getAlladmin()
      }
      this.getAllInvoice()
      this.getAllTicks()
    })
  }

  //客服选择
  customeRadio(e: any) {
    //
  }

  //新增专属客服
  handleInputConfirm2(val: any) {
    let parmas: any = {
      bill_id: this.data.id,
      admin_id: this.data.admin_id
    }
    Api.SetBillCustomerService(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
      } else {
        this.$message.warning(res.msg)
      }
    })
  }

  //获取所有客服
  getKefuAll() {
    Api.getKefu().then((res: any) => {
      this.data.options2 = res.data
    })
  }

  //点击左侧菜单事件
  laberClick(index: number) {
    let self: any = this
    self.data.actIndex = index
    let top: number = self.$refs.right.offsetTop //初始位置
    let dom: any = 'section' + index //点击元素的位置
    let actTop: number = self.$refs[dom].offsetTop
    self.$refs.right.scrollTop = actTop - top
  }

  //打开弹窗
  openDialog(type: string, name: string, selectId: number) {
    if (selectId) {
      this.data.selectId = selectId
    } else {
      this.data.selectId = 0
    }
    this.dialogName = type + name

    this.dialogVisible = true
  }
  //打开开票操作
  openDialog2(row: any) {
    if (row) {
      this.data.openInvoiceData = row
      this.dialogVisible2 = true
    } else {
      this.dialogVisible2 = true
    }
  }
  //结算状态转文本
  getSettlementName(str: string) {
    const Settlement_Status: any = this.Settlement_Status
    let arr: any = Settlement_Status.filter((item: any) => {
      return item.prop == str
    })
    return arr[0].name
  }
  //结算状态取消选择
  quxiao() {
    this.data.SettlementType = !this.data.SettlementType
    this.data.SettlementStatus = this.data.BasicInfo[2][0].value
  }
  //保存结算状态
  saveSettlement() {
    let parmas: any = {
      bill_id: this.data.id,
      settlement_status: this.data.SettlementStatus
    }
    Api.UpdateBillSettlementStatus(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
        this.data.SettlementType = false
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //保存备注
  saveRemake() {
    let parmas: any = {
      bill_id: this.data.id,
      back_remarks: this.data.billData.back_remarks
    }
    Api.UpdateBillRemarks(parmas).then((res: any) => {
      if (res.state) {
        this.$message.success(res.msg)
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //获取所有可推送对象
  getAlladmin() {
    Api.GetMemberVipAdminsByMmeberId(this.data.billData.member_id).then(
      (res: any) => {
        this.data.pushObj = res.data
      }
    )
  }
  //获取所有发票信息
  getAllInvoice() {
    Api.GetMemberInvoicesByMemberId(this.data.billData.member_id).then(
      (res: any) => {
        res.data.forEach((item: any) => {
          item.create_time = item.create_time.replace('T', ' ')
          item.create_time = item.create_time.substring(
            0,
            item.create_time.lastIndexOf(':')
          )
        })
        this.data.invoice = res.data
      }
    )
  }
  //获取所有收票信息
  getAllTicks() {
    Api.getAllTick(this.data.billData.member_id).then((res: any) => {
      res.data.forEach((item: any) => {
        item.create_time = item.create_time.replace('T', ' ')
        item.create_time = item.create_time.substring(
          0,
          item.create_time.lastIndexOf(':')
        )
      })
      this.data.ticket = res.data
    })
  }
  //关闭弹窗
  closeDialog() {
    this.dialogVisible = false
    this.dialogVisible2 = false
    this.dialogVisible3 = false
    this.dialogVisible4 = false
    this.dialogVisible7 = false
    this.data.openInvoiceData = {}
  }
  //打开图片
  open(path: string) {
    window.open(path)
  }
  //推送对象删除
  pushObjDelect(id: number) {
    Api.DeleteBillPushObject(id).then((res: any) => {
      if (res.state) {
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //服务删除
  serverDelect(parmas: any) {
    Api.DeletePaymentRecord(parmas).then((res: any) => {
      if (res.state) {
        this.init()
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //结算记录删除
  settlementDelect(id: number) {
    this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        Api.DeleteSettlementRecord(id).then((res: any) => {
          if (res.state) {
            this.init()
          } else {
            this.$message.warning(res.msg)
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
  //退款记录删除
  refundDelect(id: number) {
    this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        Api.DeleteRefundRecord(id).then((res: any) => {
          if (res.state) {
            this.init()
          } else {
            this.$message.warning(res.msg)
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
  //打开收款信息编辑
  editShoukuan(row: any) {
    this.dialogVisible7 = true
    this.data.shoukuanEdit = row
  }
  //结算、退款查看详情
  seeInfo(type: number, id: number) {
    if (type == 1) {
      this.dialogVisible5 = true
      Api.GetSettlementRecordDetails(id).then((res: any) => {
        if (res.state) {
          this.data.infoData1 = res.data
        } else {
          this.$message.warning(res.msg)
        }
      })
    } else {
      this.dialogVisible6 = true
      Api.GetRefundRecordDetails(id).then((res: any) => {
        if (res.state) {
          this.data.infoData2 = res.data
        } else {
          this.$message.warning(res.msg)
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
  //跳转用户详情
  openInfo() {
    const self: any = this
    const m_type: string = this.data.billData.m_type
    const id: any = this.data.billData.member_id
    if (m_type === 'VIP') {
      self.$router.push({
        path: `/ordinary/VipAdmin/${id}`
      })
    } else {
      self.$router.push({
        path: `/ordinary/ordinaryAdmin/${id}`
      })
    }
  }
  //返回上一页
  goBack() {
    let self: any = this
    self.$router.push('/business/listbill')
  }
  //生成账单
  createBill() {
    if (this.settingTime == '' && this.data.billData.ai_pay.length > 0) {
      this.$message.warning('请设置结算周期')
      return false
    }
    // if (this.data.billData.invoice.length == 0) {
    //   this.$message.warning('请选择发票信息')
    //   return false
    // }
    let parmas: any = {
      bill_number: this.data.billData.bill_number,
      bill_type: this.data.billData.bill_type
    }
    Api.GenerateBillPdf(parmas).then((res: any) => {
      if (res.state) {
        this.init()
        this.$message.success(res.msg)
      } else {
        this.$message.warning(res.msg)
      }
    })
  }
  //下载账单
  download() {
    if (this.data.bill_file == '') {
      this.$message.warning('账单尚未生成')
      return false
    }
    window.open(this.data.bill_file)
  }
  //删除账单
  delectBill() {
    this.$confirm('此操作将删除该账单, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        Api.DeleteBill(this.data.id).then((res: any) => {
          if (res.state) {
            this.$message.success(res.msg)
            setTimeout(() => {
              this.goBack()
            }, 2000)
          } else {
            this.$message.warning(res.msg)
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
  getInvoicName(val: string) {
    // eslint-disable-next-line no-console
    console.log(val)

    let row: any = this.invoice_types.filter((item: any) => {
      return item.prop == val
    })
    if (row.length == 0) {
      return ''
    }
    return row[0].name
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.morebill-wrap {
  width: 100%;
  min-height: 100%;
  background-color: $main-body-bgColor;
  position: relative;
  & .is-disabled {
    color: #c0c4cc !important;
  }
  .morebill-box {
    display: flex;
    & .el-table th,
    .el-table td {
      text-align: center;
    }
    & .left {
      width: 10%;
      display: flex;
      & > .text {
        div {
          color: $Main-characters;
          font-size: $Text-font;
          height: 40px;
          line-height: 40px;
          padding: 0 25px 0 0;
          text-align: right;
          cursor: pointer;
        }
        .act {
          color: #ec193a;
        }
      }
      & > .shuxian-box {
        height: 100%;
        width: 2px;
        background-color: #e4e7ed;
        position: relative;
        & > .shuxian {
          width: 100%;
          height: 40px;
          background-color: #ec193a;
          transition: transform 0.5s ease;
          transform: translateY(0);
        }
      }
    }
    & .right {
      width: 90%;
      overflow-y: auto;
      padding-right: 20px;
      .act {
        color: #ec193a !important;
      }
      & .section {
        margin-bottom: 20px;
        & > span:first-child {
          font-size: 15px;
          color: #606266;
          font-weight: bold;
          display: inline-block;
          border-left: 3px solid #e01f3c;
          height: 15px;
          line-height: 15px;
          padding-left: 10px;
          position: relative;
          width: 100%;
          & > span {
            position: absolute;
            right: 20px;
            font-weight: normal;
            font-size: 14px;
            cursor: pointer;
          }
        }
        .box {
          display: flex;
          flex-wrap: wrap;
          .text {
            width: 33.33%;
            p {
              color: $General-colors;
              font-size: 14px;
              margin: 0;
              margin-bottom: 10px;
              line-height: 32px;
              height: 32px;
              & > span:first-child {
                margin-right: 20px;
                font-size: 12px;
                color: $Secondary-text;
                display: inline-block;
                height: 32px;
                overflow: hidden;
              }
              & > span:nth-child(2) {
                display: inline-block;
                max-width: 80%;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
          & .notice {
            height: 32px;
            line-height: 32px;
            margin-bottom: 20px;
            & label {
              font-size: 12px;
              color: #909399;
            }
            & button {
              margin-left: 30px;
            }
          }
        }
      }
    }
    & .footer-bins {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding-left: 10%;
    }
  }
  & .el-dialog {
    width: 880px;
    border-radius: 10px;
    .el-dialog__header {
      .el-dialog__title {
        color: #303133;
        font-size: 16px;
        line-height: 1;
        margin-bottom: 12px;
      }
    }
    .el-dialog__body {
      padding-top: 20px;
    }
    .el-dialog__footer {
      text-align: center;
    }
  }
  & .dialog3 {
    & .el-dialog {
      width: 1200px;
    }
  }
  .el-form {
    width: 600px;
  }
  .el-divider--horizontal {
    margin: 5px 0 20px 0;
  }
  .openInfo {
    color: #409eff;
    cursor: pointer;
  }
  .info {
    color: #62d493;
  }
  .edit {
    color: #e6a23c;
  }
  .btn-box {
    position: absolute;
    bottom: 0;
    left: 10%;
  }
  .obligor {
    width: 600px;
    padding: 20px 40px;
  }
  .isHide {
    display: none;
  }
  & .remarks {
    display: block;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
