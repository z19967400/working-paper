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
            {{ item.name }}
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
                <span>账单编号</span>
                <span>{{ data.survey.bill_number }}</span>
              </p>
              <p>
                <span>开票状态</span>
                <span>{{ data.survey.invoice_status_name }}</span>
              </p>
              <p>
                <span>发票金额</span>
                <span>{{ data.survey.invoice_amount }}</span>
              </p>
            </div>
            <div class="text">
              <p>
                <span>账单类别</span>
                <span>{{ data.survey.invoice_title_name }}</span>
              </p>
              <p>
                <span>结算状态</span>
                <span>{{ data.survey.settlement_status_name }}</span>
              </p>
              <p>
                <span>已结算金额</span>
                <span>{{ data.survey.paid_amount }}</span>
              </p>
            </div>
            <div class="text">
              <p>
                <span>创建时间</span>
                <span>{{ data.survey.time }}</span>
              </p>
              <p>
                <span>原单金额</span>
                <span>{{ data.survey.total_amount }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="section" ref="section1">
          <span style="margin-top:0;" :class="{ act: data.actIndex == 1 }">{{
            data.labers[1].name
          }}</span>
          <el-divider></el-divider>
          <div class="box">
            <el-table :data="data.tableData" border style="width: 100%">
              <el-table-column prop="pay_number" label="收支编号">
              </el-table-column>
              <el-table-column prop="batch_no" label="委托批次号">
              </el-table-column>
              <el-table-column prop="e_total" label="委托数量">
              </el-table-column>
              <el-table-column prop="total_amount" label="原单金额">
              </el-table-column>
              <el-table-column prop="time" label="委托时间"> </el-table-column>
            </el-table>
          </div>
        </div>

        <div class="section" ref="section2">
          <span style="margin-top:0;" :class="{ act: data.actIndex == 2 }"
            >{{ data.labers[2].name }}
            <el-button class="edit" @click="open" type="text" size="small"
              >申请开票</el-button
            >
          </span>
          <el-divider></el-divider>
          <div v-show="data.billInfoShow" class="box">
            <div class="text">
              <p>
                <span>抬头类别</span
                ><span>{{ data.billInfo.invoice_title_type_name }}</span>
              </p>
              <p>
                <span>纳税人识别号</span
                ><span>{{ data.billInfo.tax_number }}</span>
              </p>
              <p>
                <span>开票电话</span
                ><span>{{ data.billInfo.bank_telephone }}</span>
              </p>
              <p>
                <span>收票人电话</span
                ><span>{{ data.billInfo.consignee_telephone }}</span>
              </p>
              <p>
                <span>发票号码</span
                ><span>{{ data.billInfo.invoice_number }}</span>
              </p>
            </div>
            <div class="text">
              <p>
                <span>发票类别</span
                ><span>{{ data.billInfo.invoice_type_name }}</span>
              </p>
              <p>
                <span>开户银行</span><span>{{ data.billInfo.bank_name }}</span>
              </p>
              <p>
                <span>开票地址</span
                ><span>{{ data.billInfo.bank_address }}</span>
              </p>
              <p>
                <span>收票人邮箱</span
                ><span>{{ data.billInfo.consignee_email }}</span>
              </p>
              <p>
                <span>快递单号</span
                ><span>{{ data.billInfo.tracking_number }}</span>
              </p>
            </div>
            <div class="text">
              <p>
                <span>发票抬头</span
                ><span>{{ data.billInfo.invoice_title }}</span>
              </p>
              <p>
                <span>银行账号</span
                ><span>{{ data.billInfo.bank_account }}</span>
              </p>
              <p>
                <span>收票人姓名</span
                ><span>{{ data.billInfo.consignee_name }}</span>
              </p>
              <p>
                <span>地址详情</span
                ><span>{{ data.billInfo.consignee_address }}</span>
              </p>
              <p>
                <span>开票日期</span
                ><span>{{ data.billInfo.tracking_number }}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="section" ref="section3">
          <span style="margin-top:0;" :class="{ act: data.actIndex == 3 }"
            >{{ data.labers[3].name }}
          </span>
          <el-divider></el-divider>
          <div class="box">
            <div class="text">
              <p>
                <span>结算状态</span>
                <span>{{ data.survey.settlement_status_name }}</span>
              </p>
              <p>
                <span>原单金额</span>
                <span>{{ data.survey.total_amount }}</span>
              </p>
            </div>
            <div class="text">
              <p>
                <span>发票金额</span>
                <span>{{ data.survey.invoice_amount }}</span>
              </p>
            </div>
            <div class="text">
              <p>
                <span>已结算金额</span>
                <span>{{ data.survey.paid_amount }}</span>
              </p>
            </div>
          </div>
          <div v-show="data.settlement.length != 0" class="box">
            <el-table :data="data.settlement" border style="width: 100%">
              <el-table-column prop="settlement_type" label="支付方式">
              </el-table-column>
              <el-table-column
                prop="pay_platform_number"
                label="支付平台流水号"
              >
              </el-table-column>
              <el-table-column prop="paid_amount" label="结算金额">
              </el-table-column>
              <el-table-column prop="settlement_time" label="结算时间">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="zhezhao" v-show="data.ApplyForInvoiceShow"></div>
      <el-popover
        title="申请开票"
        popper-class="editData"
        v-model="data.ApplyForInvoiceShow"
      >
        <span @click="close" class="el-icon-close close"></span>
        <el-form ref="form" :model="data.ApplyForInvoice" label-width="80px">
          <el-form-item label="账单ID">{{ data.id }}</el-form-item>
          <el-form-item label="开票金额">{{
            data.survey.invoice_amount
          }}</el-form-item>
          <el-form-item label="开票信息">
            <el-select
              v-model="data.ApplyForInvoice.invoice"
              placeholder="请选择"
            >
              <el-option
                v-for="item in data.options1"
                :key="item.value"
                :label="item.invoice_title"
                :value="item.id"
                :disabled="item.disabled"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收票信息">
            <el-select
              v-model="data.ApplyForInvoice.ticketCollection"
              placeholder="请选择"
            >
              <el-option
                v-for="item in data.options2"
                :key="item.value"
                :label="
                  item.country_name +
                    item.province_name +
                    item.city_name +
                    item.county_name
                "
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="btn-box">
            <el-button
              type="primary"
              :loading="btnLoad"
              native-type="submit"
              @click="submitForm"
              >确定</el-button
            >
            <el-button @click="close">取消</el-button>
          </el-form-item>
        </el-form>
      </el-popover>
      <!-- end -->
    </div>
  </div>
</template>
<script lang="ts" src="./info.ts"></script>
<style lang="scss">
@import "./info.scss";
</style>
